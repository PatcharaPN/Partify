"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
  changeMemberRole,
  getAllMember,
  getCompany,
  inviteMember,
  removeMember,
  removeMemberOptimistic,
  updateMemberState,
  getCompanyById,
} from "../store/slices/companySlice";
import { CompanyRole } from "../types/job.type";

export const useCompany = () => {
  const dispatch = useAppDispatch();
  const { company, members, isLoading, error, pendingInvites } = useAppSelector(
    (state) => state.CompanyReducer,
  );
  const fetchCompanyById = async (companyId: string) => {
    return await dispatch(getCompanyById(companyId)).unwrap();
  };
  useEffect(() => {
    dispatch(getCompany());
    dispatch(getAllMember());
  }, [dispatch]);

  const handleChangeMemberRole = async (email: string, role: CompanyRole) => {
    dispatch(updateMemberState({ email, role }));
    try {
      await dispatch(changeMemberRole({ email, role })).unwrap();
    } catch (err) {
      dispatch(getAllMember());
    }
  };
  const handleRemoveMember = async (email: string) => {
    dispatch(removeMemberOptimistic(email));
    try {
      await dispatch(removeMember(email)).unwrap();
    } catch (err) {
      dispatch(getAllMember());
    }
  };
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
    handleChangeMemberRole,
    handleRemoveMember,
    fetchCompanyById,
  };
};
