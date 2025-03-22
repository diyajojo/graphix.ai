from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class FileInfo(BaseModel):
    name: str
    path: str
    download_url: str

class IssueDetails(BaseModel):
    owner: str
    repo: str
    title: str
    description: str
    labels: List[str]

class IssueAnalysisRequest(BaseModel):
    owner: str
    repo: str
    filteredFiles: List[FileInfo]
    issueDetails: IssueDetails

class IssueAnalysisResponse(BaseModel):
    elapsed_time: float
    matches: dict
    status: str
    message: str