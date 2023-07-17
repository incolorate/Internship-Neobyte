import Head from "next/head";
import { useState } from "react";
import { api } from "~/utils/api";

type Customer = {
  id: string;
  First_Name: string;
  Last_Name: string;
  Company: string;
  Country: string;
  Phone_1: string;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("First_Name");

  const allData = api.example.getAll.useQuery();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(e.target.value);
    console.log(filterBy);
  };

  if (!allData.isFetched) {
    return <h1>Loading...</h1>;
  }

  console.log(allData.data[0]);

  const filteredData: Customer[] = allData
    ? (allData.data?.filter((object: Customer) =>
        object[filterBy].toLowerCase().includes(search.toLowerCase())
      ) as Customer[]) ?? []
    : "hello";

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <input
          type="text"
          className="w-44 text-black"
          value={search}
          onChange={handleSearch}
        />
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
        <table>
          <thead>
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
            {filteredData.map((object: Customer) => {
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
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}
