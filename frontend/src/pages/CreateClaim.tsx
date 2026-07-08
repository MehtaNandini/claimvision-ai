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
          await claimService.uploadDocument(claimId, doc, 'repair_estimate');
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
    <div className="pt-8 px-xl pb-xl max-w-7xl mx-auto flex-1 overflow-y-auto w-full">
      {/* Horizontal Stepper */}
      <div className="mb-xl mt-4">
        <div className="flex items-center justify-between px-2 max-w-4xl mx-auto relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-outline-variant -z-0"></div>
          <div className="absolute top-5 left-0 w-1/3 h-0.5 bg-primary -z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            </div>
            <span className="font-label-md text-label-md text-primary">Details</span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full border-4 border-background flex items-center justify-center font-bold ${images.length > 0 ? 'bg-primary text-on-primary' : 'bg-primary-container text-on-primary-container'}`}>2</div>
            <span className="font-label-md text-label-md text-primary">Upload</span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full border-2 border-outline-variant flex items-center justify-center font-bold ${loading ? 'bg-primary-container text-primary border-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>3</div>
            <span className={`font-label-md text-label-md ${loading ? 'text-primary' : 'text-on-surface-variant'}`}>Analysis</span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-outline-variant text-on-surface-variant flex items-center justify-center font-bold">4</div>
            <span className="font-label-md text-label-md text-on-surface-variant">Review</span>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Section 1: Form Fields */}
        <div className="col-span-12 lg:col-span-8 space-y-lg">
          <section className="glass-panel rounded-2xl p-lg">
            <div className="flex items-center gap-md mb-lg">
              <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">directions_car</span>
              </div>
              <div>
                <h2 className="font-title-lg text-title-lg text-on-surface">Vehicle Information</h2>
                <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Enter vehicle details to begin claim analysis.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-lg gap-y-md">
              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest ml-1">Vehicle Brand *</label>
                <input 
                  type="text" name="vehicle_brand" value={formData.vehicle_brand} onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="e.g. Toyota" 
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest ml-1">Vehicle Model *</label>
                <input 
                  type="text" name="vehicle_model" value={formData.vehicle_model} onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="e.g. Camry" 
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest ml-1">Year</label>
                <input 
                  type="number" name="vehicle_year" value={formData.vehicle_year} onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
                />
              </div>
              <div className="space-y-1">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest ml-1">Mileage</label>
                <input 
                  type="number" name="vehicle_mileage" value={formData.vehicle_mileage} onChange={handleChange}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all outline-none" 
                  placeholder="e.g. 45000"
                />
              </div>
              <div className="space-y-1 md:col-span-2 mt-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest ml-1">Accident Description *</label>
                <textarea 
                  name="description" value={formData.description} onChange={handleChange} rows={3}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 text-body-md focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none outline-none" 
                  placeholder="Describe how the damage occurred..." 
                />
              </div>
            </div>
          </section>

          {/* Section 2: Evidence Upload */}
          <section className="glass-panel rounded-2xl p-lg">
            <div className="flex items-center justify-between mb-lg">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-xl bg-tertiary-container/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined">cloud_upload</span>
                </div>
                <div>
                  <h2 className="font-title-lg text-title-lg text-on-surface">Evidence Upload</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Drag and drop assets for real-time AI processing.</p>
                </div>
              </div>
              <div className="flex gap-2 hidden sm:flex">
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold text-on-surface-variant border border-outline-variant">UP TO 50MB</span>
                <span className="bg-surface-container-high px-3 py-1 rounded-full text-[10px] font-bold text-on-surface-variant border border-outline-variant">HEIC/JPG/PDF</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <input type="file" multiple accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageChange} />
              <input type="file" multiple accept="application/pdf,image/*" className="hidden" ref={docInputRef} onChange={handleDocChange} />
              
              <div onClick={() => imageInputRef.current?.click()} className="group relative bg-surface-container-lowest border-2 border-dashed border-outline-variant hover:border-primary/50 transition-all rounded-2xl p-xl flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden min-h-[200px]">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-md group-hover:text-primary transition-colors">add_a_photo</span>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-xs">Damage Photos</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Drag exterior/interior shots here</p>
              </div>
              
              <div onClick={() => docInputRef.current?.click()} className="group relative bg-surface-container-lowest border-2 border-dashed border-outline-variant hover:border-primary/50 transition-all rounded-2xl p-xl flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden min-h-[200px]">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-md group-hover:text-primary transition-colors">upload_file</span>
                <h3 className="font-title-lg text-title-lg text-on-surface mb-xs">Supporting Documents</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Police reports or Estimates</p>
              </div>
            </div>
          </section>
        </div>

        {/* Section 3: File Status */}
        <div className="col-span-12 lg:col-span-4 space-y-lg">
          <section className="glass-panel rounded-2xl p-lg h-full flex flex-col">
            <div className="flex items-center justify-between mb-lg">
              <h2 className="font-title-lg text-title-lg text-on-surface">File Status</h2>
              <span className="font-code text-label-md text-primary animate-pulse">LIVE TRACKER</span>
            </div>
            
            <div className="space-y-md flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {images.length === 0 && documents.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-on-surface-variant opacity-60">
                  <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
                  <p className="font-label-md">No files uploaded yet.</p>
                </div>
              )}
              
              {images.map((file, idx) => (
                <div key={`img-${idx}`} className="glass-card rounded-xl p-md bg-surface-container/50 border border-outline-variant/30 relative group">
                  <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-opacity">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                  <div className="flex items-center gap-md mb-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-sm">image</span>
                    </div>
                    <div className="flex-1 overflow-hidden pr-4">
                      <p className="font-label-md text-label-md text-on-surface truncate">{file.name}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase">{(file.size / 1024 / 1024).toFixed(1)} MB • {loading ? 'Processing' : 'Pending'}</p>
                    </div>
                    {loading ? (
                      <span className="material-symbols-outlined text-primary animate-spin text-sm">sync</span>
                    ) : (
                      <span className="material-symbols-outlined text-green-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </div>
                  {loading && (
                    <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-primary w-[65%] rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              ))}
              
              {documents.map((file, idx) => (
                <div key={`doc-${idx}`} className="glass-card rounded-xl p-md bg-surface-container/50 border border-outline-variant/30 relative group">
                  <button onClick={() => removeDoc(idx)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error transition-opacity">
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                  <div className="flex items-center gap-md mb-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-on-surface-variant text-sm">picture_as_pdf</span>
                    </div>
                    <div className="flex-1 overflow-hidden pr-4">
                      <p className="font-label-md text-label-md text-on-surface truncate">{file.name}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase">{(file.size / 1024).toFixed(0)} KB • {loading ? 'Processing' : 'Pending'}</p>
                    </div>
                    {loading ? (
                      <span className="material-symbols-outlined text-primary animate-spin text-sm">sync</span>
                    ) : (
                      <span className="material-symbols-outlined text-green-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {loading && (
              <div className="mt-xl p-md bg-primary-container/10 rounded-2xl border border-primary/30">
                <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-md">System Status</h3>
                <ul className="space-y-sm">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[14px] text-primary mt-0.5 animate-spin">autorenew</span>
                    <p className="text-xs text-on-surface">{statusText}</p>
                  </li>
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Global Actions Footer */}
      <div className="mt-xl flex flex-col md:flex-row items-center justify-between gap-lg pt-lg border-t border-outline-variant">
        <div className="flex items-center gap-md">
          <button onClick={() => navigate('/')} className="px-lg py-2.5 rounded-xl border border-outline-variant text-on-surface-variant font-label-md text-label-md hover:bg-surface-variant/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Search
          </button>
        </div>
        <div className="flex items-center gap-md">
          <div className="hidden md:block text-right mr-md">
            <p className="text-[10px] text-on-surface-variant uppercase font-bold">Estimated Processing Time</p>
            <p className="font-code text-label-md text-on-surface">~12.5 seconds</p>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className={`glowing-btn px-xl py-3 rounded-xl bg-primary text-on-primary font-title-lg text-title-lg flex items-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] transition-transform active:scale-95'}`}
          >
            <span>{loading ? 'Processing...' : 'Initialize AI Analysis'}</span>
            <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>{loading ? 'autorenew' : 'bolt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
