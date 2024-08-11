import React from "react";
import { useTranslation } from "react-i18next";

// rests
import SocialRest from "../../rests/secure/SocialRest";

// models
import PageableModel from "../../models/ui/Pageable/PageableModel";

// interfaces
import IPageable from "../../models/ui/Pageable/IPageable";

// hooks
import usePageableHook from "../pageableHook";
import SocialModel from "../../models/db/SocialModel/SocialModel";

type Props = {
  refetchKey?: number;
};

export default function useGetAllSocialsHook({ refetchKey }: Props) {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  const [socials, setSocials] = React.useState<SocialModel[] | null>(null);

  const {
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    onChangeCountRows,
  } = usePageableHook();

  const fetchSocials = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const pageable = new PageableModel({ page, rowsPerPage } as IPageable);
      const response = await SocialRest.getAll(pageable);
      const data = response.data;
      setSocials(data.rows.map((i) => new SocialModel(i)));
      onChangeCountRows(data.countRows);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.log("social fetch error", error);
      setError(t("FORMS.SOCIALS.MESSAGES.SOCIALS_NOT_FETCHED"));
      setIsLoading(false);
      throw error;
    }
  }, [page, rowsPerPage, refetchKey]);

  React.useEffect(() => {
    fetchSocials();
  }, [fetchSocials]);

  return {
    isLoading,
    error,
    socials,
    page,
    rowsPerPage,
    countRows,
    totalPages,
    onChangePage,
    onChangeRowsPerPage,
    fetchSocials,
  };
}
