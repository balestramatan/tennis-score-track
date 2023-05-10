import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { ISelect } from "../../interfaces/shared";
import IPicker from "../Shared/IPicker";
import { toTitleCase } from "../../utils/textTranformers";

interface IProps {
  citySelection: string;
  setCitySelection: (number: string) => void;
  cities: ISelect[];
  setCities: (cities: ISelect[]) => void;
}

const LocationStep = (props: IProps) => {
  const { cities, setCities, setCitySelection, citySelection } = props;
  const fetchLocations = async () => {
    const response = await fetch("https://data.gov.il/api/3/action/datastore_search?resource_id=b7cf8f14-64a2-4b33-8d4b-edb286fdbd37&limit=5000");
    const locations = await response.json();

    const locationsList: ISelect[] = locations.result.records.map((location: any) => {
      const locationISelect: ISelect = {
        _id: toTitleCase(location["שם_ישוב_לועזי"]),
        value: toTitleCase(location["שם_ישוב_לועזי"])
      };

      return locationISelect;
    });

    locationsList.sort((a, b) => {
      return a.value.localeCompare(b.value);
    });

    setCities(locationsList);
    setCitySelection(locationsList[6].value);
  };

  useEffect(() => {
    fetchLocations().then(() => console.log("locations fetched..."));
  }, []);

  return <IPicker options={cities} selection={citySelection} style={pickerStyle} setSelection={setCitySelection} />;
};

const pickerStyle = StyleSheet.create({
  item: {
    height: 300
  }
});

export default LocationStep;
