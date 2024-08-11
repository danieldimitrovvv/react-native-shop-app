import { AxiosResponse } from "axios";

//  types
import { ProductCategoryTypes } from "../../models/types/ProductCategoryTypes";

//  interfaces
import IProductRequestModel from "../../models/RequestDTO/ProductModel/IProductRequestModel";
import IPageable from "../../models/ui/Pageable/IPageable";

// models
import ProductPageableData from "../../models/ui/PageableData/ProductPageableData/ProductPageableData";
import ProductModel from "../../models/db/ProductModel/ProductModel";
import PageableModel from "../../models/ui/Pageable/PageableModel";

//  rests
import SecureRest from "./SecureRest";

// services
import { ProductBrandTypes } from "../../models/types/ProductBrandTypes";
import ProductsFilterRequestModel from "../../models/RequestDTO/ProductsFilterModel/ProductsFilterRequestModel";
import AuthenticationService from "../../services/AuthenticationService";
import RouterLinksTypes from "../../models/types/RouterLinksTypes";

class ProductRest extends SecureRest {
  constructor(baseURL: string) {
    super(baseURL);
  }

  create = async (
    data?: IProductRequestModel
  ): Promise<AxiosResponse<ProductModel>> => {
    const body = { ...data };
    return this.instance.post("", body);
  };

  update = async (
    data?: IProductRequestModel
  ): Promise<AxiosResponse<ProductModel>> => {
    const body = { ...data };
    return this.instance.put("/" + data?.id, body);
  };

  getAll = async (
    pageable?: IPageable
  ): Promise<AxiosResponse<ProductPageableData>> => {
    const pageableModel = new PageableModel(pageable);

    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res("FAKE AWAIT");
    //   }, 5000);
    // });

    return this.instance.get("", {
      params: {
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  getById = async (id: number): Promise<AxiosResponse<ProductModel>> => {
    return this.instance.get("/" + id);
  };

  getByFilters = async (
    filters: ProductsFilterRequestModel,
    pageable?: IPageable
  ): Promise<AxiosResponse<ProductPageableData>> => {
    const { searchVal, category, brand } = filters;
    const pageableModel = new PageableModel(pageable);

    return this.instance.get(`/search-by`, {
      params: {
        value: searchVal,
        category: category?.toUpperCase(),
        brand: brand?.toUpperCase(),
        page: pageableModel.page,
        size: pageableModel.rowsPerPage,
      },
    });
  };

  getLatests = async (
    number: number
  ): Promise<AxiosResponse<ProductModel[]>> => {
    return this.instance.get(`/latests`, {
      params: {
        number: number,
      },
    });
  };

  publish = async (
    id: number,
    isPublish: boolean
  ): Promise<AxiosResponse<ProductModel>> => {
    const data = {
      isPublish: isPublish,
    };

    return this.instance.post(`/publish/` + id, data, {
      headers: {
        Authorization: "Bearer " + AuthenticationService.token,
      },
    });
  };

  convertImages = async (id: number): Promise<AxiosResponse<ProductModel>> => {
    return this.instance.put(
      `/convert-images/` + id,
      {},
      {
        headers: {
          Authorization: "Bearer " + AuthenticationService.token,
        },
      }
    );
  };

  delete = async (
    id: number
  ): Promise<AxiosResponse<{ effectRows: number }>> => {
    // await new Promise((res, rej) => {
    //   setTimeout(() => {
    //     res("FAKE AWAIT");
    //   }, 5000);
    // });

    return this.instance.delete(`/` + id);
  };
}

export default new ProductRest(`/products`);
