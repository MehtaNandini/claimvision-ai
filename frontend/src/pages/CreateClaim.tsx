import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { claimService } from '../services/api';

export default function CreateClaim() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('Waiting for upload...');
  const [formData, setFormData] = useState({
    vehicle_brand: '',
    vehicle_model: '',
    vehicle_year: new Date().getFullYear(),
    vehicle_mileage: '',
    description: ''
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  
  const imageInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const handleDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments([...documents, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeDoc = (index: number) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!formData.vehicle_brand || !formData.vehicle_model || !formData.description) {
      alert("Please fill out the required vehicle information and description.");
      return;
    }
    
    if (images.length === 0) {
      alert("Please upload at least one vehicle image.");
      return;
    }

    setLoading(true);
    try {
      setStatusText('Creating claim record...');
      const res = await claimService.createClaim(formData);
      const claimId = res.data.id;

      // Upload images
      setStatusText(`Uploading ${images.length} images...`);
      for (const img of images) {
        await claimService.uploadImage(claimId, img);
      }

      // Upload documents
      if (documents.length > 0) {
        setStatusText(`Uploading ${documents.length} documents...`);
        for (const doc of documents) {
          await claimService.uploadDocument(claimId, doc, 'repair_estimate'); // Default to repair_estimate for now
        }
      }

      setStatusText('Initializing AI Analysis...');
      await claimService.analyzeClaim(claimId);
      
      setStatusText('Redirecting to results...');
      navigate(`/claims/${claimId}`);
    } catch (err) {
      console.error(err);
      alert('Failed to process claim initialization.');
      setStatusText('Error processing claim.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 overflow-y-auto p-xl pb-[120px]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-xl">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-2">Initialize New Claim</h2>
            <p className="text-on-surface-variant font-body-md">Upload vehicle photos and repair estimates for instant multimodal AI analysis.</p>
          </div>

          <div className="flex items-center gap-4 mb-lg">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase px-4 bg-primary/10 rounded-full py-1 border border-primary/20">Step 1: Claimant & Vehicle Info</span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>

          <div className="glass-card rounded-2xl p-xl mb-3xl">
            <div className="grid grid-cols-2 gap-lg mb-lg">
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Vehicle Brand <span className="text-error">*</span></label>
                <input 
                  type="text" 
                  name="vehicle_brand"
                  value={formData.vehicle_brand}
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                  placeholder="e.g. Toyota" 
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Vehicle Model <span className="text-error">*</span></label>
                <input 
                  type="text" 
                  name="vehicle_model"
                  value={formData.vehicle_model}
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                  placeholder="e.g. Camry" 
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Year</label>
                <input 
                  type="number" 
                  name="vehicle_year"
                  value={formData.vehicle_year}
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                />
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Mileage</label>
                <input 
                  type="number" 
                  name="vehicle_mileage"
                  value={formData.vehicle_mileage}
                  onChange={handleChange}
                  className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" 
                  placeholder="e.g. 45000" 
                />
              </div>
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Accident Description <span className="text-error">*</span></label>
              <textarea 
                rows={3} 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-surface-container-highest border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none" 
                placeholder="Briefly describe what happened..."
              ></textarea>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-lg">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="font-label-md text-label-md text-tertiary tracking-widest uppercase px-4 bg-tertiary/10 rounded-full py-1 border border-tertiary/20">Step 2: Evidence Upload</span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-lg">
            {/* Image Upload */}
            <div className="glass-card rounded-2xl p-xl flex flex-col">
              <div className="flex items-center gap-2 mb-md">
                <span className="material-symbols-outlined text-tertiary">photo_camera</span>
                <h3 className="font-title-lg text-title-lg text-on-surface">Vehicle Damage Images</h3>
              </div>
              <p className="text-on-surface-variant text-sm mb-lg">Upload clear photos of the vehicle damage from multiple angles.</p>
              
              <input type="file" multiple accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} />
              
              <div 
                onClick={() => imageInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-highest/30 flex flex-col items-center justify-center p-xl hover:border-tertiary hover:bg-tertiary/5 transition-all cursor-pointer group mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-tertiary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-tertiary text-3xl">add_photo_alternate</span>
                </div>
                <p className="font-label-md text-label-md text-on-surface mb-1">Drag & drop images here</p>
                <p className="text-xs text-on-surface-variant">or click to browse files (JPEG, PNG)</p>
              </div>

              {images.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Selected Files</h4>
                  <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                    {images.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-surface-container p-2 rounded-lg border border-outline-variant/50">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <span className="material-symbols-outlined text-tertiary text-sm">image</span>
                          <span className="text-sm text-on-surface truncate">{file.name}</span>
                        </div>
                        <button onClick={() => removeImage(idx)} className="text-on-surface-variant hover:text-error">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Document Upload */}
            <div className="glass-card rounded-2xl p-xl flex flex-col">
              <div className="flex items-center gap-2 mb-md">
                <span className="material-symbols-outlined text-secondary">description</span>
                <h3 className="font-title-lg text-title-lg text-on-surface">Supporting Documents</h3>
              </div>
              <p className="text-on-surface-variant text-sm mb-lg">Upload repair estimates, police reports, or medical bills.</p>
              
              <input type="file" multiple accept="application/pdf,image/*" className="hidden" ref={docInputRef} onChange={handleDocChange} />
              
              <div 
                onClick={() => docInputRef.current?.click()}
                className="flex-1 border-2 border-dashed border-outline-variant rounded-xl bg-surface-container-highest/30 flex flex-col items-center justify-center p-xl hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer group mb-4"
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-secondary text-3xl">upload_file</span>
                </div>
                <p className="font-label-md text-label-md text-on-surface mb-1">Drag & drop documents here</p>
                <p className="text-xs text-on-surface-variant">or click to browse files (PDF, JPEG, PNG)</p>
              </div>

              {documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Selected Files</h4>
                  <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                    {documents.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-surface-container p-2 rounded-lg border border-outline-variant/50">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <span className="material-symbols-outlined text-secondary text-sm">picture_as_pdf</span>
                          <span className="text-sm text-on-surface truncate">{file.name}</span>
                        </div>
                        <button onClick={() => removeDoc(idx)} className="text-on-surface-variant hover:text-error">
                          <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <aside className="w-[320px] bg-surface-container-low border-l border-outline-variant p-xl flex flex-col z-10">
        <h3 className="font-title-lg text-title-lg text-on-surface mb-xl flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">analytics</span>
          Analysis Pipeline
        </h3>
        
        <div className="relative pl-6 border-l-2 border-outline-variant space-y-xl flex-1">
          <div className="relative">
            <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-surface-container-low"></div>
            <h4 className="font-label-md text-label-md text-on-surface mb-1">Data Intake</h4>
            <p className="text-sm text-on-surface-variant">Collecting claim info and user inputs</p>
          </div>
          <div className={`relative ${loading ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`absolute -left-[29px] top-1 w-4 h-4 rounded-full ring-4 ring-surface-container-low ${loading ? 'bg-tertiary' : 'bg-outline-variant'}`}></div>
            <h4 className="font-label-md text-label-md text-on-surface mb-1">File Processing</h4>
            <p className="text-sm text-on-surface-variant">{loading ? statusText : 'Awaiting files...'}</p>
          </div>
          <div className={`relative ${loading && statusText.includes('AI') ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`absolute -left-[29px] top-1 w-4 h-4 rounded-full ring-4 ring-surface-container-low ${loading && statusText.includes('AI') ? 'bg-secondary' : 'bg-outline-variant'}`}></div>
            <h4 className="font-label-md text-label-md text-on-surface mb-1">AI Execution</h4>
            <p className="text-sm text-on-surface-variant">Computer Vision & OCR extraction</p>
          </div>
          <div className="relative opacity-40">
            <div className="absolute -left-[29px] top-1 w-4 h-4 rounded-full bg-outline-variant ring-4 ring-surface-container-low"></div>
            <h4 className="font-label-md text-label-md text-on-surface mb-1">Final Report</h4>
            <p className="text-sm text-on-surface-variant">Synthesizing multimodal insights</p>
          </div>
        </div>
      </aside>

      <div className="absolute bottom-0 left-0 w-[calc(100%-320px)] bg-surface/90 backdrop-blur-md border-t border-outline-variant p-lg px-xl flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant animate-pulse-subtle">smart_toy</span>
          <p className="font-code text-sm text-on-surface-variant">System ready for multimodal inference.</p>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className={`glowing-btn bg-primary text-on-primary px-8 py-3 rounded-xl font-label-md text-label-md font-bold uppercase tracking-wider flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin">autorenew</span>
              Processing...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">rocket_launch</span>
              Initialize AI Analysis
            </>
          )}
        </button>
      </div>
    </div>
  );
}
