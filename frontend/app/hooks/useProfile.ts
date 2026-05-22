import { useAlert } from "../contexts/AlertModalContext";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { fetchProfile, upsertProfile } from "../store/slices/profileSlice";
import { Profile } from "../types/job.type";

export const useProfile = () => {
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const { profile, upsertLoading, fetchLoading } = useAppSelector(
    (state) => state.profileReducer,
  );

  const handleUpsert = (data: Partial<Profile>) => {
    try {
      dispatch(upsertProfile(data)).unwrap();
      alert({
        variant: "success",
        title: "บันทึกสำเร็จ",
        description: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
      });
    } catch (error) {
      alert({
        variant: "error",
        title: "บันทึกไม่สำเร็จ",
        description: "เกิดข้อผิดพลาด ข้อมูลไม่สามารถบันทึกได้",
      });
    }
  };

  const handleFetch = () => {
    dispatch(fetchProfile());
  };

  return {
    profile,
    upsertLoading,
    fetchLoading,
    handleUpsert,
    handleFetch,
  };
};
