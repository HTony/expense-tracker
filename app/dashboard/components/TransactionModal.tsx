"use client";

import { useEffect, useState } from "react";
import { TransactionProps } from "../utils/type";
import BaseModal from "./BaseModal";
import { insertTransaction, updateTransaction } from "@/app/dashboard/actions";
import CategorySelect from "./CategorySelect";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: "add" | "update";
  data?: TransactionProps;
};

const TransactionModal = ({ isOpen, onClose, type, data }: Props) => {
  const [transacObj, setTransacObj] = useState<TransactionProps>(
    data as TransactionProps
  );

  useEffect(() => {
    if (data) {
      setTransacObj(data);
    } else {
      setTransacObj({
        id: "",
        date: "",
        description: "",
        category: "Grocery",
        amount: 0,
      });
    }
  }, [data]);

  const handleChange = (field: string, value: string | number) => {
    setTransacObj({ ...transacObj, [field]: value });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={type === "add" ? "Add Transaction" : "Update Transaction"}
      modalBody={
        <form id="transaction_form">
          <label className="form-control w-full">
            <input type="hidden" id="id" name="id" value={data?.id} />
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <input
              type="date"
              id="date"
              name="date"
              value={transacObj?.date}
              placeholder="Choose date"
              className="input input-bordered w-full"
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              id="description"
              name="description"
              value={transacObj?.description}
              className="textarea textarea-bordered"
              placeholder="Describe your transaction"
              onChange={(e) => handleChange("description", e.target.value)}
            ></textarea>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <CategorySelect
              value={transacObj?.category}
              onChange={(e) => handleChange("category", e.target.value)}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Amount</span>
            </div>
            <input
              id="amount"
              name="amount"
              type="number"
              value={transacObj?.amount}
              step="0.01"
              placeholder="Transaction Amount"
              className="input input-bordered w-full"
              onChange={(e) => handleChange("amount", e.target.value)}
            />
          </label>
        </form>
      }
      submitBtn={
        <button
          className="btn btn-primary"
          form="transaction_form"
          formAction={type === "add" ? insertTransaction : updateTransaction}
        >
          {type === "add" ? "Add" : "Update"}
        </button>
      }
    />
  );
};

export default TransactionModal;
