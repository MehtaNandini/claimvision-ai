from pydantic import BaseModel
from typing import List

class UserResponse(BaseModel):
    id: int
    images: List[str] = []
    
    class Config:
        from_attributes = True

class User:
    def __init__(self, id):
        self.id = id

user = User(id=1)
user.images = ["hello.jpg"]
print(UserResponse.model_validate(user).model_dump())
