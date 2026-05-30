import { useAppDispatch } from "@/app/lib/hooks";
import { acceptInvite, declineInvite } from "@/app/store/slices/companySlice";

export const useInvite = () => {
  const dispatch = useAppDispatch();

  const handleAcceptInvite = async (inviteId: string) => {
    await dispatch(acceptInvite(inviteId)).unwrap();
  };

  const handleDeclineInvite = async (inviteId: string) => {
    await dispatch(declineInvite(inviteId)).unwrap();
  };

  return { handleAcceptInvite, handleDeclineInvite };
};
