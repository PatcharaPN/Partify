"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { getCompany } from "../store/slices/companySlice";

export const useCompany = () => {
  const dispatch = useAppDispatch();
  const { company } = useAppSelector((state) => state.CompanyReducer);

  useEffect(() => {
    dispatch(getCompany());
  }, [dispatch]);
  const companyData = company;
  return { companyData };
};
