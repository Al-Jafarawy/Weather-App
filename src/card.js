import "./App.css";
//Material UI
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
//react
import { useEffect, useState } from "react";
//redux
import { useSelector, useDispatch } from "react-redux";
import { featchWeather } from "./apiSlice";

//Mixed Libarary
import { useTranslation } from "react-i18next";
import "dayjs/locale/ar";
import dayjs from "dayjs";

export default function MediaCard() {
  //Redux
  const dispatch = useDispatch();
  const isLoad = useSelector((state) => {
    return state.apiReducer.isLoading;
  });
  const temp = useSelector((state) => {
    return state.apiReducer.weather;
  });

  //Mixed
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState("ar");

  //Using functions
  function handelLangChange() {
    if (lang === "en") {
      setLang("ar");
      i18n.changeLanguage("ar");
    } else {
      setLang("en");
      i18n.changeLanguage("en");
    }
  }

  useEffect(() => {
    i18n.changeLanguage("ar");
  }, []);

  useEffect(() => {
    dispatch(featchWeather());
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <Card
        className="card-content"
        style={{
          maxWidth: 500,
          backgroundColor: "skyblue",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            style={{ padding: "0 20px 10px" }}
          >
            <span
              style={{
                display: "inline-block",
                verticalAlign: "bottom",
                marginRight: "10px",
              }}
            >
              {t("Cairo")}
            </span>
            <span
              style={{
                fontSize: "12px",
                display: "inline-block",
                verticalAlign: "bottom",
                marginRight: "5px",
              }}
            >
              {dayjs().locale(lang).format("D MMMM YYYY")}
            </span>
          </Typography>
          <hr />
        </CardContent>
        <CardContent
          style={{ display: "flex", alignItems: "center", gap: "50px" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ fontSize: "70px", margin: " 0 10px" }}>
                {isLoad ? <CircularProgress style={{ color: "white" }} /> : ""}
                {temp.CurrentTemp}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                style={{ height: "80px", width: "80px" }}
                alt=""
              />
            </div>
            <span> {t(temp.disc)}</span>
          </div>
          <CloudIcon
            style={{ height: "200px", width: "200px", color: "white" }}
          />
        </CardContent>
        <div style={{ display: "flex", gap: "20px", padding: " 0 30px 20px" }}>
          <span size="small">
            {t("Min")}: {temp.min}
          </span>
          |
          <span size="small">
            {t("Max")}: {temp.max}
          </span>
        </div>
      </Card>
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "skyblue",
          width: "fit-content",
          padding: "3px 5px ",
        }}
        onClick={handelLangChange}
        variant="text"
      >
        {lang === "ar" ? "انجليزي" : "Arabic"}
      </div>
    </div>
  );
}
