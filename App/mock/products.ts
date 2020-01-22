import { Request, Response } from 'express';

// Anderson: 07-10-2019
// Simulando lista de Produtos.
const Products = [
    {
        code: '900',
        description: 'ESTRADO DE BORRACHA - COM FUROS 25MM',
        unity: 'PC',    
    },

    {
      code: '117',
      description: 'LUVA TOP FORRADA M PAR SANRO',
      unity: 'PC',    
    },

]


// service mock / Api
export default {
    // Anderson: 03.10.2019
    // Simula a busca de dados na tabela de Produtos.
    'GET /api/currentProduct': (req: Request, res: Response) => {
      const { prodid } = req.query;
      let foundProduct = undefined;

      // Pesquisa o produto na lista por código do produto.
      foundProduct = Products.filter((prod) => {
        return prod.code === prodid;
      })
        
      res.send(foundProduct.length > 0 ? {
        product: foundProduct[0] , 
        found: true 
      } : 
      {
        product: {} , 
        found: false 
      });     

      return;
    },

    // Salva novo movimento do produto no Movest
    'POST /api/saveProduct': (req: Request, res: Response) => {
      // Simulando o salvamento

      setTimeout( () => { res.send({
        product: {},
        found: false,
        submitted: true,
        result: { 
          status:'success',
          title: 'Operação concluída com Sucesso !',
          subTitle: 'Movimentação de estoque efetuada com Sucesso !'
        }
      });  }, 2000 );  
    }



}

