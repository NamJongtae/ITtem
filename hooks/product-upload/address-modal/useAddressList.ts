import { useState } from 'react';

export default function useAddressList() {
  const [addressList, setAddressList] = useState<string[]>([]);
  return { addressList, setAddressList };
}
