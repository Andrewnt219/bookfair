import { axios } from '../../../lib/axios';
import { MutationConfig, useTypedMutation } from '../../../lib/react-query';
import { User_PurchaseListing } from '../../../pages/api/user/purchaseListing';

const purchaseSlot = async (body: User_PurchaseListing['input']) => {
  await axios.post<User_PurchaseListing['return']>(
    '/user/purchaseListing',
    body
  );
};

export interface UsePurchaseSlotOptions {
  config?: MutationConfig<typeof purchaseSlot>;
}

export const usePurchaseSlot = ({ config }: UsePurchaseSlotOptions = {}) => {
  return useTypedMutation<typeof purchaseSlot>({
    ...config,
    mutationFn: purchaseSlot,
  });
};
