import Layout from "~/components/Layout";

import { useState } from "react";
import { api } from "~/utils/api";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

type Customer = {
  id: string;
  First_Name: string;
  Last_Name: string;
  Company: string;
  Country: string;
  Phone_1: string;
};

export default function Users() {
  // Form control state`
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("First_Name");
  // Items / page increase by 15
  const [perPage, setPerPage] = useState(15);

  // Form control
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(e.target.value);
  };

  // Click down / up arrow`
  const handleAddData = () => {
    setPerPage((prev) => prev + 15);
  };
  const handleRemoveData = () => {
    setPerPage((prev): number => (prev > 29 ? prev - 15 : prev));
  };

  // Fetch Data
  const allData = api.example.getAll.useQuery();

  // Check if data is fetched
  if (!allData.isFetched) {
    return (
      <Layout>
        <h1>Loading...</h1>;
      </Layout>
    );
  }

  // Filter data by search
  const filteredData: Customer[] =
    (allData.data?.filter((object: Customer) =>
      object[filterBy].toLowerCase().includes(search.toLowerCase())
    ) as Customer[]) ?? [];

  return (
    <Layout>
      <main className=" min-h-screen text-black">
        <div className="flex w-full gap-6 p-4">
          <label className="flex flex-col">
            Search:
            <input
              type="text"
              className="w-44 rounded-xl bg-slate-300 p-1 text-black"
              value={search}
              onChange={handleSearch}
            />
          </label>

          <label className="flex flex-col">
            Search by:
            <select
              name="cars"
              id="cars"
              className="rounded-xl bg-slate-300 p-1 text-black"
              onChange={handleSelect}
            >
              <option value="First_Name">First name</option>
              <option value="Last_Name">Last Name</option>
              <option value="Company">Company</option>
              <option value="City">City</option>
              <option value="Country">Country</option>
              <option value="Customer_Id">Customer ID</option>
              <option value="Phone_1">Phone</option>
            </select>
          </label>
        </div>
        <table className="w-full">
          <thead className="bg-zinc-300 p-2 text-left">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company</th>
              <th>City</th>
              <th>Country</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredData
              .map((object: Customer) => {
                return (
                  <tr key={object.id}>
                    <td>{object.First_Name}</td>
                    <td>{object.Last_Name}</td>
                    <td>{object.Company}</td>
                    <td>{object.City}</td>
                    <td>{object.Country}</td>
                    <td>{object.Phone_1}</td>
                  </tr>
                );
              })
              .slice(1, perPage)}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center gap-2">
          <div onClick={handleAddData}>
            <FaArrowDown />
          </div>
          <div onClick={handleRemoveData}>
            <FaArrowUp />
          </div>
        </div>
      </main>
    </Layout>
  );
}
