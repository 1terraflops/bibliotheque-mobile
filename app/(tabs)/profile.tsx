import { ScreenLayout } from "@/components/shared";
import { UserInfo } from "@/components/user-profile";

export default function Profile() {
  return (
    <ScreenLayout scrollable>
      <UserInfo />
    </ScreenLayout>
  );
}
