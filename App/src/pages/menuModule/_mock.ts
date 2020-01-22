import { Request, Response } from 'express';
import { CardListItemDataType } from './data.d';

const titles = [
  'Nota Fiscal - Pedido',
  'Nota Fiscal - Serviço',
  'Venda Rápida',
  'Movimentação de Estoque',
  'Importação de XML NF-e',
  'Boletos / CNAB-400',
  'Configuração de NF-e',
  'PDV - Ponto de Venda',
  'Limpeza Mov. de Estoque',
  'Manifesto de Documentos'
];
const avatars = [''];
const covers = [''];
const desc = [''];
const user = [''];

function fakeList(count: number): CardListItemDataType[] {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: `fake-list-${i}`,
      owner: user[i % 10],
      title: titles[i],
      avatar: avatars[i % 8],
      cover: parseInt(`${i / 4}`, 10) % 2 === 0 ? covers[i % 4] : covers[3 - (i % 4)],
      status: ['active', 'exception', 'normal'][i % 3] as
        | 'normal'
        | 'exception'
        | 'active'
        | 'success',
      percent: Math.ceil(Math.random() * 50) + 50,
      logo: avatars[i % 8],
      href: '',
      updatedAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i).getTime(),
      subDescription: desc[i % 5],
      description:'',
      activeUser: Math.ceil(Math.random() * 100000) + 100000,
      newUser: Math.ceil(Math.random() * 1000) + 1000,
      star: Math.ceil(Math.random() * 100) + 100,
      like: Math.ceil(Math.random() * 100) + 100,
      message: Math.ceil(Math.random() * 10) + 10,
      content:'',
      members: [],
    });
  }

  return list;
}

function getFakeList(req: Request, res: Response) {
  const params = req.query;

  const count = params.count * 1 || 20;

  const result = fakeList(count);
  return res.json(result);
}

export default {
  'GET  /api/card_list/fake_list': getFakeList,
};
