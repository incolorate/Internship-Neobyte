import Layout from "~/components/Layout";

import { useState } from "react";
import { api } from "~/utils/api";

export default function Users() {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("First_Name");

  const allData = api.example.getAll.useQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(e.target.value);
  };

  if (!allData.isFetched) {
    return (
      <Layout>
        <h1>Loading...</h1>;
      </Layout>
    );
  }
  const filteredData: Customer[] = allData
    ? (allData.data?.filter((object: Customer) =>
        object[filterBy].toLowerCase().includes(search.toLowerCase())
      ) as Customer[]) ?? []
    : "hello";

  return (
    <Layout>
      <main className=" min-h-screen text-black">
        <div className="flex w-full gap-6 p-4">
          <label>
            Search
            <input
              type="text"
              className="w-44 text-black"
              value={search}
              onChange={handleSearch}
            />
          </label>

          <label>
            Search by:
            <select
              name="cars"
              id="cars"
              className="text-black"
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
              .slice(1, 15)}
          </tbody>
        </table>
      </main>
    </Layout>
  );
}
