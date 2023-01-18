from model.user import User


class UserInDB(User):
    hashed_password: str
