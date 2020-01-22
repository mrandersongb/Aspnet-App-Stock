import { Request, Response } from 'express';

// Anderson: 16.09.2019
// Fake Database
const Users = [
  {
    name: 'user',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'teste@dataplus.com.br',
    signature: '12345',
    title: 'User',
    group: 'user'
  },
  {
    name: 'admin',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000002',
    email: 'admin@dataplus.com.br',
    signature: '12345',
    title: 'Admin',
    group: 'admin'
  }
]

// service mock / Api
export default {
  // Anderson: 16-09-2019
  // Simula a busca de dados do usuário autenticado.
  'GET /api/currentUser': (req: Request, res: Response) => {
    //const { userid } = req.body;
    const { userid } = req.query;
    let  currentUser = undefined;

    currentUser = Users.filter(user =>{ 
      return user.userid === userid
    });
    
    res.send(currentUser.length > 0 ? currentUser[0] : undefined);
    return;
  },
  
  // GET POST 
  'GET /api/users': Users,

  // Anderson: 16-09-2019
  // Simula uma requisição de autenticação do usuário.
  'POST /api/login': (req: Request, res: Response) => {
    const { password, userName, type } = req.body;

    let userAuth = {
      status:'error',
      type,
      currentAuthority: '',
      userid:''
    };

    Users.map(user=>{
      if (password === user.signature && userName === user.name) {
          userAuth.currentAuthority = user.group;
          userAuth.status = 'ok';
          userAuth.userid = user.userid;
          return;
      }
    });

    res.send({
      status: userAuth.status,
      type,
      currentAuthority: userAuth.currentAuthority,
      userid: userAuth.userid
    });

    return;
    
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
