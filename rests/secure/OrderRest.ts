import { AxiosResponse } from "axios";

// models
import PageableModel from "../../models/ui/Pageable/PageableModel";
import IOrderModel from "../../models/db/OrderModel/IOrderModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// types
import { ProductCurrencyCodeTypes } from "../../models/types/ProductCurrencyCodeTypes";
import OrderStatusTypes from "../../models/types/OrderStatusTypes";

// rests
import SecureRest from "./SecureRest";
import IOrderPageableData from "../../models/ui/PageableData/OrderPageableData/IOrderPageableData";
import IOrderResponseModel from "../../models/ResponsesDTO/OrderResponseModel/IOrderResponseModel";

class OrderRest extends SecureRest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  create = async (data: IOrderModel): Promise<AxiosResponse<IOrderModel>> => {
    const body = { ...data };
    return this.instance.post("", body);
  };

  updateStatus = async (
    id: number,
    status: OrderStatusTypes
  ): Promise<AxiosResponse<IOrderResponseModel>> => {
    const body = { status };
    return this.instance.put("/status/" + id, body);
  };

  getAll = async (
    pageable?: IPageable
  ): Promise<AxiosResponse<IOrderPageableData>> => {
    const pageableModel = new PageableModel(pageable);

    return this.instance.get("", {
      params: {
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  getByStatus = async (
    status: OrderStatusTypes,
    pageable?: IPageable
  ): Promise<AxiosResponse<IOrderPageableData>> => {
    const pageableModel = new PageableModel(pageable);
    return this.instance.get(`/search-by`, {
      params: {
        status:
          status === OrderStatusTypes.UNKNOWN ? null : status?.toUpperCase(),
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  getById = async (id: number): Promise<AxiosResponse<IOrderResponseModel>> => {
    return this.instance.get("/" + id);
  };

  delete = async (
    id: number
  ): Promise<AxiosResponse<{ effectRows: number }>> => {
    return this.instance.delete(`/` + id);
  };
}

export default new OrderRest(`/orders`);
