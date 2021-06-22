import { computed } from "vue";
import { store } from "@/store";
import { PublicEnumsApi } from "../apis/public/enums";

export const useEnums = () => {
  const enums = computed(() => store.state["enums"].data);

  const getEnums = async () => {
    const { version } = await new PublicEnumsApi().POST({
      action: "getVersion",
    });

    if (version !== enums.value.config.version) {
      await store.dispatch("enums/get");
    }
  };

  return { enums, getEnums };
};
