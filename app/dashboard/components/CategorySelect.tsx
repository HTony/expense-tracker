"use client";

import { createClient } from "@/utils/supabase/client";
import { ChangeEventHandler, useEffect, useState } from "react";

type Props = {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

type CategoryOption = {
  id: string;
  name: string;
};

const CategorySelect = ({ value, onChange }: Props) => {
  const supabase = createClient();
  const [options, setOptions] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const loadCategory = async () => {
      const { data } = await supabase.from("transac_category").select("*");
      setOptions(
        data?.map((d) => ({
          id: d.id,
          name: d.name,
        })) as CategoryOption[]
      );
    };

    loadCategory();
  }, []);

  return (
    <select
      name="category"
      value={value}
      className="select select-bordered"
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </select>
  );
};

export default CategorySelect;
