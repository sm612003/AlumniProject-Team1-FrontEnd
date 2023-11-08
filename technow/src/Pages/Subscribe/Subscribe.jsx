import { Subscribe } from "../../Layouts/SubscribeSection/Subscribe";
import { ScrollButton } from "../../Components/ScrollButton/ScrollButton";
import Toast from "../../Components/Toast/Toast";

const SubscribePage = () => {
  return (
    <>
      <Toast />
      <Subscribe page={true} />
      <ScrollButton />
    </>
  );
};

export default SubscribePage;
