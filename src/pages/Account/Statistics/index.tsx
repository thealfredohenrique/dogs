import { lazy, Suspense, useEffect, useState } from "react";
import Error from "../../../components/Error";
import Head from "../../../components/Head";
import Loading from "../../../components/Loading";
import { getStatistics, IStatistics } from "../../../services/statistics";
import styles from "./styles.module.css";

const Chart = lazy(() => import("../../../components/Chart"));

const Statistics = () => {
  const [statistics, setStatistics] = useState<IStatistics[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        setLoading(true);
        const response = await getStatistics();
        setStatistics(response);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error && <Error message={error} />}
      {loading && <Loading />}
      {statistics && (
        <Suspense fallback={<></>}>
          <Head title="Statistics" />
          <Chart statistics={statistics} />
        </Suspense>
      )}
    </>
  );
};

export default Statistics;
