"use server";

import { createClient } from "@/utils/supabase/server";

export async function insertTransaction(formData: FormData) {
  const supabase = createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const transactionObj = {
    date: formData.get("date"),
    category: formData.get("category"),
    description: formData.get("description"),
    amount: formData.get("amount"),
  };

  const res = await supabase
    .from("transaction")
    .insert({ ...transactionObj, user_id: userId })
    .select("*")
    .single();
}

export async function updateTransaction(formData: FormData) {
  const supabase = createClient();

  const transacId = formData.get("id");

  const transactionObj = {
    date: formData.get("date"),
    category: formData.get("category"),
    description: formData.get("description"),
    amount: parseFloat(formData.get("amount") as string),
  };

  console.log({ transactionObj });

  const res = await supabase
    .from("transaction")
    .update({ ...transactionObj })
    .eq("id", transacId)
    .select("*")
    .single();
}

export async function deleteTransaction(id: string) {
  const supabase = createClient();

  const data = await supabase.from("transaction").delete().eq("id", id);

  console.log(data);
}
