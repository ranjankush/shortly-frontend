import { useQuery } from "react-query";
import api from "../api/api";


export const useFetchMyShortUrls = (token, onError) => {
  return useQuery("my-shortenurs",
    async () => {
      return await api.get(
        "/api/urls/myurls",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );
    },
    {
      enabled: !!token,
      select: (data) => {
        const sortedData = data.data.sort(
          (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
        );
        return sortedData;
      },
      onError,
      staleTime: 5000,
    }
  );
};

// useQuery hook (in useQuery.js or similar)
export const useFetchTotalClicks = (token, startDate, endDate, onError) => {
  return useQuery(
    ["url-totalclick", startDate, endDate],
    async () => {
      const response = await api.get(
        `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    {
      enabled: !!token && !!startDate && !!endDate,
      // enabled: false,
      select: (data) => {
  const convertToArray = Object.entries(data.data).map(([key, value]) => ({
    clickDate: key,
    count: value,
  }));

  convertToArray.sort((a, b) => {
    const dateA = new Date(a.clickDate);
    const dateB = new Date(b.clickDate);

    return dateA.getTime() - dateB.getTime(); // ✅ safe sort
  });

  return convertToArray;
},
      onError,
      staleTime: 5000,
    }
  );
};
