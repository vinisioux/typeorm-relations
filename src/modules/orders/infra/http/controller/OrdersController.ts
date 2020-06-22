import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    // TODO
    const { id } = request.params;
    const findOrderService = container.resolve(FindOrderService);
    const order = await findOrderService.execute({ id });

    return response.status(200).json({
      customer: order?.customer,
      order_products: order?.order_products,
    });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customer_id, products });

    return response.json(order);
  }
}
