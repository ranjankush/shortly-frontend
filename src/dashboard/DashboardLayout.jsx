import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import { useStoreContext } from "../contextApi/ContextAPI";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../hooks/useQuery";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";
const DashboardLayout = () => {
  // const refetch=false;
  const { token } = useStoreContext();
  const [shortenPopUp, setShortenPopUp] = useState(false);
  // const totalClicksQuery = useFetchTotalClicks(token, onError);

  const today = new Date().toISOString().slice(0, 10);
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const defaultStart = oneMonthAgo.toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(today);
  const [fetchClicks, setFetchClicks] = useState(false);

  const {
    isLoading,
    data: myShortenUrls,
    refetch,
  } = useFetchMyShortUrls(token, onError);

  const {
    isLoading: loader,
    data: totalClicks,
    refetch: fetchClickData,
  } = useFetchTotalClicks(token, startDate, endDate, onError);

  function onError() {
    console.log("ERROR");
  }
  // console.log(totalClicksQuery);

  const totalClickCount = Array.isArray(totalClicks)
    ? totalClicks.reduce((acc, curr) => acc + (curr.count || 0), 0)
    : 0;

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)]">
      {loader ? (
        // <p >Loading.......</p>
        <div className="flex justify-center items-center w-full h-[450px]">
          <div className="flex flex-col items-center gap-1 -mt-10">
            <Hourglass
              visible={true}
              height="50"
              width="50"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
            <p className="text-slate-700">Loading...</p>
          </div>
        </div>
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Total Clicks
            </h2>
            <p className="text-4xl font-bold text-blue-600">
              {totalClickCount}
            </p>
          </div>

          {/* Search filter for date */}

          <div className="flex flex-col sm:flex-row justify-end gap-4 mb-6">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <button
              onClick={() => {
                if (new Date(endDate) < new Date(startDate)) {
                  alert("End date must be after start date.");
                  return;
                }
                fetchClickData(); // ✅ TRIGGER QUERY
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>

          <div className="h-96 relative">
            {Array.isArray(totalClicks) && totalClicks.length === 0 && (
              <div className="absolute flex flex-col  justify-center sm:items-center items-end  w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className=" text-slate-800 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                  No Data For This Time Period
                </h1>
                <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-slate-600 ">
                  Share your short link to view where your engagements are
                  coming from
                </h3>
              </div>
            )}
            {/* <Graph graphData={ totalClicks } /> */}
            <Graph graphData={Array.isArray(totalClicks) ? totalClicks : []} />
          </div>

          <div className="py-5 sm:text-end text-center">
            <button
              className="bg-custom-gradient-2 py-2 px-4 rounded-md"
              onClick={() => setShortenPopUp(true)}
            >
              Create a new short url
            </button>
          </div>

          <div className="">
            {!isLoading && myShortenUrls.length === 0 ? (
              <div className="flex justify-center pt-16">
                <div className="flex gap-2 items-center justify-center  py-6 sm:px-8 px-5 rounded-md   shadow-lg  bg-gray-50">
                  <h1 className="text-slate-800 font-montserrat   sm:text-[18px] text-[14px] font-semibold mb-1 ">
                    You haven't created any short link yet
                  </h1>
                  <FaLink className="text-blue-500 sm:text-xl text-sm " />
                </div>
              </div>
            ) : (
              <ShortenUrlList data={myShortenUrls} />
            )}
          </div>
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};
export default DashboardLayout;
