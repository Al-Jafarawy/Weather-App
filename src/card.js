import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs, { locale } from "dayjs";
import "dayjs/locale/ar";
import { useTranslation } from "react-i18next";

let cancelAxios = null;

export default function MediaCard() {
  const { t, i18n } = useTranslation();
  const [temp, setTemp] = useState({
    CurrentTemp: null,
    disc: "",
    Min: null,
    max: null,
    icon: null,
  });
  const [lang, setLang] = useState("ar");

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
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=30.0444&lon=31.2357&appid=9e8f3063805f1d779997dd062d923c33",
        {
          cancelToken: new axios.CancelToken((e) => {
            cancelAxios = e;
          }),
        }
      )
      .then(function (response) {
        const CurrentTemp = Math.round(response.data.main.temp - 273);
        const max = Math.round(response.data.main.temp_max - 273);
        const min = Math.round(response.data.main.temp_min - 273);
        const disc = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        setTemp({ CurrentTemp, max, min, disc, icon });
      })
      .catch(function (error) {
        console.log(error);
      });

    return () => {
      cancelAxios();
    };
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
