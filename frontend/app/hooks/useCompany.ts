"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  getAllMember,
  getCompany,
  inviteMember,
} from "../store/slices/companySlice";
import { CompanyRole } from "../types/job.type";

export const useCompany = () => {
  const dispatch = useAppDispatch();
  const { company, members, isLoading, error, pendingInvites } = useAppSelector(
    (state) => state.CompanyReducer,
  );

  useEffect(() => {
    dispatch(getCompany());
    dispatch(getAllMember());
  }, [dispatch]);

  const handleInviteMember = async (email: string, role: CompanyRole) => {
    await dispatch(inviteMember({ email, role })).unwrap();
    dispatch(getAllMember());
  };

  return {
    company,
    members,
    isLoading,
    error,
    handleInviteMember,
    pendingInvites,
  };
};
