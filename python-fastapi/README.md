# FastAPI Aprendizado

## Setup

`python -c "import sys; print(sys.path)"`: só pra printar o sys.path que mostra onde os imports buscarão os pacotes

`virtualenv aprendizado`: criação do ambiente virtual

`source aprendizado/bin/activate`: ativação do ambiente virtual # acho que isso aqui vai precisar executar toda vez antes de executar

`deactivate`: desativação do ambiente virtual

`pip install fastapi`: Instalação do framework FastAPI

`pip install uvicorn`: Instalação do servidor ASGI uvicorn

`pip install python-jose[cryptography]`: Instalação do módulo responsável por gerar e verificar tokens JWT

`pip install passlib`: Instalação do módulo responsável por fazer hashes de senhas

## Desenvolvimento

`source aprendizado/bin/activate`: ativação do ambiente virtual # acho que isso aqui vai precisar executar toda vez antes de executar

## Execução

`uvicorn main:app --reload`: Inicialização do objeto 'app' do módulo 'main' no servidor unicorv com a opção de recarregar se for alterado, usado apenas em ambiente de desenvolvimento.

## Conceitos FastAPI

O FastAPI é construído em cima do Starlette (ASGI framework/toolkit) e Pydantic (biblioteca pra lidar com dados). É baseado na _OpenAPI_, conhecido anteriormente como Swagger, uma especificação para construção de APIs que faz parte da Linux Foundation. É o que torna possível a automação de múltiplas interfaces de documentação interativas, geração de código etc.

**Path Operation:** através de um decorator @app.<método HTTP>("/pathEndpoint") define-se um endpoint. Exemplos:

```
@app.post("/pessoas")
@app.put("/carros")
@app.delete("/copos")
```

E cada decorator fica em cima da função que será invocada a cada request naquele path e método HTTP:

```
@app.get("/")
async def root():
    return {"message": "Hello World"}
```

Versões modernas de Python suporta código assíncrono (chamado de coroutines) com a sintaxe `async` e `await`. A documentação do FastAPI recomenda que se estiver usando uma biblioteca que, por exemplo, acessa um banco de dados e não suporta `await` deve-se declarar uma função sem o `async`. Se não sabe, não use `async`.

_Asynchronous code just means that the language 💬 has a way to tell the computer / program 🤖 that at some point in the code, it 🤖 will have to wait for something else to finish somewhere else. Let's say that something else is called "slow-file" 📝._

_So, during that time, the computer can go and do some other work, while "slow-file" 📝 finishes_

A função decorada pode retornar `dict`, `list`, valores simples e models do Pydantic.

Também podem ser configurados atributos do Path Operation como tags, status HTTP, descrição etc. A especificaçao OpenAPI exige que a resposta tenha uma descrição (response_description), se não for informada, o FastAPI vai gerar com uma descrição default 'Successfull response':

```
@app.get("/users/", status_code=status.HTTP_201_CREATED, tags=["users"], summary="Lê usuário", description="Vai ler um usuário e te devolver", response_description="Vai ser retornado o usuário, meu chapa", deprecated=True)
async def read_users():
    return [{"username": "johndoe"}]
```

FastAPI também permite utilizar _docstring_(expressão em múltiplas linhas como primeira expressão de uma função) para uma documentação mais robusta do path operation:

```
@app.post("/items/", response_model=Item, summary="Create an item")
async def create_item(item: Item):
    """
    Create an item with all the information:

    - **name**: each item must have a name
    - **description**: a long description
    - **price**: required
    - **tax**: if the item doesn't have tax, you can omit this
    - **tags**: a set of unique tag strings for this item
    """
    return item
```

**Path Parameters:** entre chaves no path do decorator. Os parâmetros da função decorada podem ser tipados ou não. Caso tipado, o dado será validado e caso não corresponda será retornada uma resposta com o JSON indicando erro. A validação é realizada por baixo dos panos com a biblioteca Pydantic.

```
@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}
```

**Query Parameters:** Os parâmetros da função que não tem equivalentes no path são automaticamente interpretados como query parameters. Podendo até mesmo ter valor default quando não vierem na URL da requisição. Para indicar que o query parameter é opcional, coloque seu valor default como None

```
@app.get("/items/{item_id}")
async def read_item(item_id: int, esseVaiSerQueryParam: str = "veio vazia", esseEopcional = None):
    return {"item_id": item_id}
```

**Cookies:** Para usar cookies, importe a função `Cookie` do pacote/módulo fastapi, declare um parâmetro colocando o valor default como uma chamada a esta função. Ao usar a função Cookie, o FastAPI entende que não é um Query Parameter:

```
from fastapi import Cookie, FastAPI

@app.get("/items/")
async def read_items(ads_id: Optional[str] = Cookie(None)):
    return {"ads_id": ads_id}
```

**Header Parameter:** Para usar cabeçalho HTTP, importe a função `Header` do pacote/módulo fastapi, declare um parâmetro colocando o valor default como uma chamada a esta função. Ao usar a função Header, o FastAPI entende que não é um Query Parameter:

```
from fastapi import FastAPI, Header

@app.get("/items/")
async def read_items(user_agent: Optional[str] = Header(None)):
    return {"User-Agent": user_agent}
```

ATENÇÃO: A maioria dos cabeçalhos são separados por hífen, mas uma varíavel com hífen não é válida em Python. Então, por default, a função Header converte os underscores no nome do parâmetro para hífen. Mas caso ainda seja necessário utilizar um cabeçalho com "\_" e o FastAPI não puder fazer essa conversão, é possível parametrizar com `convert_underscores`:

```
@app.get("/items/")
async def read_items(strange_header: Optional[str] = Header(None, convert_underscores=False)):
    return {"strange_header": strange_header}
```

Para cabeçalhos com múltiplos valores (múltiplas ocorrências com mesmo nome de cabeçalho), como um `X-Token` por exemplo utiliza-se um `list` Python:

```
@app.get("/items/")
async def read_items(x_token: Optional[List[str]] = Header(None)):
    return {"X-Token values": x_token}
```

**Validação de Query Parameter:** Para incluir validações adicionais (além de obrigatório ou não), é possível fazê-lo importando a função `Query` do pacote/módulo fastapi. No exemplo abaixo, o query parameter 'q' é não obrigatório, mas vindo, não pode ser menor que 3, não pode exceder 50 caracteres e tem que obedecer uma expressão regular (o primeiro parâmetro de `Query` indica o valor default):

```
from fastapi import FastAPI, Query

@app.get("/items/")
async def read_items(q: Optional[str] = Query(None, min_length=3, max_length=50, regex="^jureba[0-9]")):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

Quando utiliza-se `Query`, mesmo que seja só para definir o valor default, é possível estabelecer que o parâmetro esperado é uma lista e aí a URL é algo assim `http://localhost:8000/items/?q=foo&q=bar`:

```
@app.get("/items/")
async def read_items(q: Optional[List[str]] = Query(None)):
    query_items = {"q": q}
    return query_items
```

PS: se não usar `Query`, o parâmetro 'q' ia ser interpretado como um request body.

Para validações de parâmetros numéricos, basta utilizar os outros operadors apropriados: ge, gt, le, lt:

```
@app.get("/items/{item_id}")
async def read_items( *, item_id: int = Path(..., gt=0, le=1000), q: str):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

**Request Body:** Para declarar um corpo da requisição usa-se um modelo Pydantic: importa-se o BaseModel e cria-se uma classe herdeira. Os atributos do modelo que têm valores default estabelecidos não são obrigatórios. Para definir classe model como request body, basta declarar um parâmetro com seu tipo:

```
from pydantic import BaseModel

class Item(BaseModel):
    name: str    ''' esse é obrigatório
    description: Optional[str] = None
    price: float ''' esse também
    tax: Optional[float] = None

@app.post("/items/")
async def create_item(item: Item):
    return item
```

Quando existir mais de um parâmetro do tipo Pydantic model, FastAPI entenderá que trata-se de um body múltiplo e esperará um JSON que terá uma propriedade diferente com o nome de cada um destes parâmetros:

```
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item, user: User):
    results = {"item_id": item_id, "item": item, "user": user}
    return results
```

```
{
    "item": {
        "name": "Foo",
        "description": "The pretender",
        "price": 42.0,
        "tax": 3.2
    },
    "user": {
        "username": "dave",
        "full_name": "Dave Grohl"
    }
}
```

Caso tenha só um Pydantic model mas queira forçar que este seja uma propriedade de um objeto externo, basta setar a propriedade embed pra True:

```
@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item = Body(..., embed=True)):
    results = {"item_id": item_id, "item": item}
    return results
```

**Validação de Body Parameter:** Para incluir validações adicionais, é possível fazê-lo importando a função `Field` do pacote/módulo pydantic e na definição dos atributos do Pydanctic model utilizá-la:

```
from pydantic import BaseModel, Field

class Item(BaseModel):
    name: str
    description: Optional[str] = Field(None,  max_length=300)
    price: float = Field(..., gt=0)
    tax: Optional[float] = None
```

**Response Body:** Para definir o tipo de retorno utiliza-se o parâmetro `response_model` no decorator:

```
@app.post("/user/", response_model=UserOut, status_code=201)
async def create_user(user: UserIn):
    return user
```

Também é possível remover da resposta os atributos que não foram setados com o parâmetro `response_model_exclude_unset`, atributos que estão com o valor definido como default com o parâmetro `response_model_exclude_defaults` e excluir os None com `esponse_model_exclude_none` (Ver documentação Pydantic):

```
@app.get("/items/{item_id}", response_model=Item, response_model_exclude_unset=True)
async def read_item(item_id: str):
    return items[item_id]
```

O response pode ser tipos múltiplos usando o tipo `Union`, isso significa que a resposta pode ser de qualquer um dos tipos da lista:

```
@app.get("/items/{item_id}", response_model=Union[PlaneItem, CarItem])
async def read_item(item_id: str):
    return items[item_id]
```

**Informações adicionais na especificação OpenAPI:** Para incluir informações adicionais para query parameters na especificação OpenAPI gerada automaticamente, também utiliza-se `Query`:

```
from fastapi import FastAPI, Query

@app.get("/items/")
async def read_items(q: Optional[str] = Query(None, min_length=3, max_length=50, title="Eu sou um título", description="Eu sou a descrição que vai aparecer lá" )):
    results = {"items": [{"item_id": "Foo"}, {"item_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
```

Para incluir informações adicionais para PATH parameters na especificação OpenAPI gerada automaticamente, utiliza-se `Path`. Como um Path Parameter é sempre obrigatório, é necessário declarar como o sprread (...) no primeiro parâmetro:

```
@app.get("/items/{item_id}")
async def read_items(
    item_id: int = Path(..., title="Eu sou um título de Path", description="E eu, uma descrição")
):
    results = {"item_id": item_id}
    if q:
        results.update({"q": q})
    return results
```

Para incluir informações adicionais para BODY parameter na especificação OpenAPI gerada automaticamente, utiliza-se a função `Body` do pacote/módulo fastapi para metadados da entidade e `Field` do pacote/módulo Pydantic nos atributos desejados no Pydantic model:

```
class Item(BaseModel):
    name: str
    description: Optional[str] = Field(None, title="eu sou um título", max_length=300)
    price: float = Field(..., gt=0, description="Eu sou descrição", example="1,99")
    tax: Optional[float] = None

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item = Body(..., embed=True,
                                                           title="Título da entidade (confirmar)"
                                                           example={
                                                               "name": "João",
                                                               "description": "Empinador de bike",
                                                               "price": "0.00",
                                                               "tax": 10,
                                                           })):
    results = {"item_id": item_id, "item": item}
    return results
```

**Upload de Arquivos:** Para receber upload de arquivos, basta instalar o pacote `python-multipart` e importar a função `File` do pacote fastapi. Ao utilizar a função `File`, o FastAPI entende que não é um query parameter, receberá o arquivo como um array de bytes e os manterá em memória (bom para arquivos menores):

```
from fastapi import FastAPI, File, UploadFile

@app.post("/files/")
async def create_file(file: bytes = File(...)):
    return {"file_size": len(file)}
```

Usando o tipo `UploadFile` ao invés de `bytes`, o arquivo passa a ser gravado em disco a partir de uma quantidade estabelecida de bytes, o que é mais recomendado para arquivos maiores:

```
@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    return {"filename": file.filename}
```

Tanto com `UploadFile` quanto com `bytes`, é possível fazer upload de múltiplos arquivos usando `List`:

```
@app.post("/files/")
async def create_files(files: List[bytes] = File(...)):
    return {"file_sizes": [len(file) for file in files]}

@app.post("/uploadfiles/")
async def create_upload_files(files: List[UploadFile] = File(...)):
    return {"filenames": [file.filename for file in files]}
```

**Lidando com Exceções:** importe a classe `HTTPException` do pacote fastapi informando o código HTTP e um `detail` que pode ser tanto uma string com a mensagem de erro quanto um objeto, lista, dict etc:

```
from fastapi import FastAPI, HTTPException


@app.get("/items/{item_id}")
async def read_item(item_id: str):
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"item": items[item_id]}
```

Também é possível passar cabeçalhos na exceção retornada:

```
raise HTTPException( status_code=404, detail="Item not found",  headers={"X-Error": "There goes my error"} )
```

Para lidar com exceções de determinado tipo de forma global, cria-se uma função com o decorator `@app.exception_handler`:

```
@app.exception_handler(UnicornException)
async def unicorn_exception_handler(request: Request, exc: UnicornException):
    return JSONResponse(
        status_code=418,
        content={"message": Eita! {exc.name} fez alguma cagada ..."},
    )
```

**Injeção de Dependências:** Utilizado geralmente para lógicas transversais, isto é, usadas em múltiplos endpoints. Quando um endpoint que tem injeção de dependência é requisitado, o FastAPI trata se obter o resultado da injeção de dependência e então prosseguir com a execução do _Path Operation_.

O FastAPI permite realizar injeção de dependências com a função `Depends` do pacote fastapi passando como parâmetro para ela:

**_Funções_**:

```
from fastapi import Depends, FastAPI

async def common_parameters(q: Optional[str] = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@app.get("/items/")
async def read_items(commons: dict = Depends(common_parameters)):
    return commons


@app.get("/users/")
async def read_users(commons: dict = Depends(common_parameters)):
    return commons
```

**Classes**:

```
class CommonQueryParams:
    def __init__(self, q: Optional[str] = None, skip: int = 0, limit: int = 100):
        self.q = q
        self.skip = skip
        self.limit = limit

@app.get("/items/")
async def read_items(commons: CommonQueryParams = Depends(CommonQueryParams)):
    response = {}
    if commons.q:
        response.update({"q": commons.q})
    items = fake_items_db[commons.skip : commons.skip + commons.limit]
    response.update({"items": items})
    return response
```

A injeção de dependência também ser passada para o _decorator_ do _path operation_ caso o valor não seja utilizado dentro da função que trata a requisição:

```
async def verify_token(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def verify_key(x_key: str = Header(...)):
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid")
    return x_key


@app.get("/items/", dependencies=[Depends(verify_token), Depends(verify_key)])
async def read_items():
    return [{"item": "Foo"}, {"item": "Bar"}]
```

Para injetar dependências globais, elas também pode ser adicionadas ao objeto da aplicação FastAPI. Neste caso, elas serão aplicadas a todos os _path operations_ da aplicação:

```
async def verify_token(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def verify_key(x_key: str = Header(...)):
    if x_key != "fake-super-secret-key":
        raise HTTPException(status_code=400, detail="X-Key header invalid")
    return x_key


app = FastAPI(dependencies=[Depends(verify_token), Depends(verify_key)])
```

FastAPI permite que se estabeleça de dependências que são chamadas antes do _path operation_ ser invocado, e também possuem uma parte do código que será chamado após. Tipicamente, utilizado para liberar recursos. São os `dependencies with yield`.

Para isso, é necessária a instalação do pacote `pip3 install async-exit-stack async-generator`.

Esse tipo de dependência pode ser utilizado, por exemplo, para obter uma conexão com BD e, após a conclusão, fechá-la. Apenas o código até a linha do `yield` é executado antes de enviar a resposta. O valor do `yield` será valor injetado (usado ao invés de `return`). O código após a linha do `yield` é executado após a resposta da requisição. (utilizando o `finally`, mesmo que ocorra execeção, o código será chamado)

```
async def get_db():
    db = DBSession()
    try:
        yield db
    finally:
        db.close()
```

## Segurança

### Conceitos

O FastAPI provê vários utilitários para lidar com segurança das APIs de forma fácil e rápida. Incluindo:

**OAuth2:** a especificação define várias formas de lidar com autenticação e autorização. Foi projetado de forma que o backend possa ser independente do servidor que autentica o usuário (se assim o quiser), incluindo autenticação utilizando terceiros. Ao contrário do OAuth1, o OAuth2 não especifica como encriptar a comunicação, espera-se que a aplicação esteja utilizando HTTPS.

**OpenID Connect:** especificação baseada em OAuth2 que define algumas questões ambíguas no OAuth2 tornando-o mais interoperável.

**OpenID:** especificação que tenta resolver as mesmas questões que o OpenID Connect, porém, ele não é baseado no OAuth2. Não é muito popular nem utilizado atualmente.

A _OpenAPI_, especificação na qual é baseada o FastAPI, possui múltiplos schemas de segurança. Utilizando-os, é possível obter vantagens de todas as ferramentas baseadas nestes padrões. A OpenAPI define os seguintes schemas de segurança:

**apiKey:** uma chave específica da aplicação que pode vir de um query parameter, header ou cookies.

**http:** sistemas de autenticação padrão HTTP, incluindo: - `bearer`: um cabeçalho 'Authorization' com um valor 'Bearer ' mais um token (isso é herdado do OAuth2); - HTTP basic authentication; - HTTP Digest, etc.

**oauth2:** todas as formas de lidar com segurança do OAuth2 (chamados 'flows'). Vários desses 'flows' são apropriados para construir um provedor de autenticação (como Google, Facebook, Twitter, Github etc): - implicit - clientCredencials - authorizationCode
Existe um 'flow' específico que pode ser perfeitamente utilizado para lidar com autenticação diretamente na própria aplicação, o 'password'.

"_OAuth2 specifies that when using the "password flow" (that we are using) the client/user must send a username and password fields as form data. And the spec says that the fields have to be named like that. So user-name or email wouldn't work_.

_The spec also states that the username and password must be sent as form data (so, no JSON here)_.

_The spec also says that the client can send another form field "scope". The form field name is scope (in singular), but it is actually a long string with "scopes" separated by spaces. Each "scope" is just a string (without spaces). They are normally used to declare specific security permissions, for example: users:read or users:write are common examples_."

**openIdConnect:** forma de definir como descobrir dados de autenticação OAuth2 automaticamente.

### Exemplos

Para proteger os endpoints, será nescessário instalar o pacote `pip3 install python-multipart`.

```
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

app = FastAPI()

# utiliza o flow 'password' do OAuth2 (com token 'Bearer') indicando, no parâmetro `tokenUrl`, a URL para a qual o frontend deve enviar o usuário/senha para obter um token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/items/")
# ao incluir esta proteção como dependência, o endpoint já aparece com cadeado na interface OpenAPI. Ao invocar esse endpoint, automaticamente será verificada a existência de um header 'Authorization' cujo valor seja 'Bearer ' seguido de um token
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}

# implementação do endpoint para onde o frontend deve enviar usuário/senha e receber um token. `OAuth2PasswordRequestForm` é uma classe que declara um 'form body' com `username`, `password`, além dos opcionais scope, grant_type, client_id e client_secret.
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_users_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    # o retorno do token deve ser JSON e, como estamos tokens 'Bearer', o token_type dele deve ser 'bearer'
    return {"access_token": user.username, "token_type": "bearer"}

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

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
```

Ver https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/ para exemplo de OAuth com JWT

## Middlewares

Um middleware é uma função que atua em toda requisição antes dela ser processada pelo função destino do endpoint (path operation) e também atua em toda resposta antes de retorná-la.

Para criar um middleware, cria uma função com o decorator `@app.middleware("http")`. Esta função deve receber um `Request` como parâmetro de entrada, o passará para o path operation correspondente e então retornará a resposta gerada pelo path operation.

```
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response
```

## CORS - Cross-Origin Resource Sharing

Refere-se a situações em que o Javascript do frontend comunica-se com backend em outra origem. Origem é a combinação de protocolo, domínio e porta.

O navegador envia uma requisição HTTP OPTIONS para o backend e se o backend devolver a autorização apropriada no cabeçalho HTTP, o navegador permite a comunicação. Mas para isso, o backend precisa ter uma lista de "allowed origins". Sendo possível neste caso utilizar "\*" (wildcard) para permitir todos.

Para configurar CORS em uma aplicação com FastAPI, pode-se utilizar o CORSMiddleware (que na verdade é importado do starlette):

```
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
