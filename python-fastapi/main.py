from model.userInDB import UserInDB
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from model.user import User
from model.item import Item
from typing import Optional
from fastapi.security import OAuth2PasswordBearer


from fastapi import FastAPI, status, Depends, HTTPException
from model.item import Item


app = FastAPI()

# utiliza o flow 'password' do OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

# get em todos os itens é protegido por oauth2


@app.get("/items/")
def read_item(token: str = Depends(oauth2_scheme)):
    return [{"item_id": 1, "q": "feijao"}, {"item_id": 2, "q": "arroz"}]


@app.post("/items/", status_code=status.HTTP_201_CREATED)
def new_item(item: Item):
    return {"item_name": item.name}


@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}


# implementação do endpoint para onde o frontend deve enviar usuário/senha e receber um token
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(
            status_code=400, detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


def fake_hash_password(password: str):
    return "fakehashed" + password


def fake_decode_token(token):
    return User(
        username=token + "fakedecoded", email="john@example.com", full_name="John Doe"
    )


# The additional header WWW-Authenticate with value Bearer we are returning here is also part of the spec.
# Any HTTP (error) status code 401 "UNAUTHORIZED" is supposed to also return a WWW-Authenticate header.
# In the case of bearer tokens (our case), the value of that header should be Bearer.
# You can actually skip that extra header and it would still work.
# But it's provided here to be compliant with the specifications.
async def get_current_user(token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# o endpoint que retorna o usuário corrente, tem uma dependência da função `get_current_user` que, por sua vez, é protegida pela dependência do oauth2_scheme


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "fakehashedsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderson",
        "email": "alice@example.com",
        "hashed_password": "fakehashedsecret2",
        "disabled": True,
    },
}
