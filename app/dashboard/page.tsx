"use client";

import { useEffect, useState } from "react";
import TransactionModal from "./components/TransactionModal";
import { type TransactionProps } from "@/app/dashboard/utils/type";
import { useSupabase } from "@/providers/SupabaseProvider";
import { deleteTransaction } from "./actions";
import { RealtimeChannel } from "@supabase/supabase-js";

export default function DashboardPage() {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<TransactionProps[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"add" | "update">("add");
  const [editTransaction, setEditTransaction] = useState<
    TransactionProps | undefined
  >(undefined);
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleInsert = (record: any) => {
    setTransactions((prev) => {
      const { id, date, description, category, amount } =
        record as TransactionProps;
      return [
        {
          id,
          date,
          description,
          category,
          amount,
        },
        ...(prev ?? []),
      ].sort((e1, e2) => {
        let t1 = new Date(e1.date);
        let t2 = new Date(e2.date);
        return t1 > t2 ? -1 : 1;
      });
    });
    setIsOpen(false);
  };

  const handleUpdate = (record: any) => {
    setTransactions((prev) => {
      const { id, date, description, category, amount } = record;
      return prev?.map((e) => {
        if (e.id === id) {
          return { ...e, date, description, category, amount };
        } else {
          return e;
        }
      });
    });
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev?.filter((e) => e.id !== id));
    setIsOpen(false);
  };

  useEffect(() => {
    const loadTransactions = async () => {
      const { data } = await supabase.from("transaction").select("*");
      setTransactions(
        data
          ?.sort((e1, e2) => {
            let t1 = new Date(e1.date);
            let t2 = new Date(e2.date);
            return t1 > t2 ? -1 : 1;
          })
          .map((d) => ({
            id: d.id,
            date: d.date,
            description: d.description,
            category: d.category,
            amount: d.amount,
          })) as TransactionProps[]
      );
      setLoading(false);
    };

    loadTransactions();
  }, []);

  useEffect(() => {
    const data: RealtimeChannel = supabase
      .channel("transaction")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "transaction" },
        (payload) => handleInsert(payload.new)
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "transaction" },
        (payload) => handleDelete(payload.old.id)
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "transaction" },
        (payload) => handleUpdate(payload.new)
      )
      .subscribe();

    return () => {
      data.unsubscribe();
    };
  }, []);

  return (
    <div className="w-full h-full p-7">
      <TransactionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        type={modalType}
        data={editTransaction}
      />
      <div className="w-full">
        <button
          className="btn"
          onClick={() => {
            setModalType("add");
            setEditTransaction(undefined);
            setIsOpen(true);
          }}
        >
          Add Transaction
        </button>
      </div>
      <div className="w-full pt-4">
        {loading ? (
          <div className="w-full text-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>CTA</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.category}</td>
                  <td>{USDollar.format(t.amount)}</td>
                  <td>
                    <div className="flex gap-4">
                      <button
                        className="btn btn-error"
                        onClick={() => deleteTransaction(t.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => {
                          setModalType("update");
                          setEditTransaction(t);
                          setIsOpen(true);
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
