#Due to nested response
from .project import ProjectResponse
from .portfolio import PortfolioResponse

ProjectResponse.model_rebuild()
PortfolioResponse.model_rebuild()
