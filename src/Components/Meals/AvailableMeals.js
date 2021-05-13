import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
const AvailableMeals = () => {
    const { isLoading, error, sendRequest } = useHttp();
    const [loadedMeals, setLoadedMeals] = useState([]);
    useEffect(() => {
        let tempData = {};
        sendRequest(
            {
                url: "https://reactorders-17a3b-default-rtdb.firebaseio.com/meals.json",
            },
            (data) => {
                const tempMeals = [];
                tempData = data;
                for (let id in tempData) {
                    let item = tempData[id];
                    tempMeals.push(item);
                }
                setLoadedMeals(tempMeals);
            }
        );
    }, [sendRequest]);
    let content = <p>Loading...</p>;
    if (isLoading) content = <p>Loading...</p>;
    else if (error) content = <p className={classes["error-text"]}>{error}</p>;
    else if (!isLoading && loadedMeals.length !== 0)
        content = (
            <ul>
                {loadedMeals.map((meal) => (
                    <MealItem key={meal.id} item={meal} />
                ))}
            </ul>
        );
    else content = <p>No Items Present!!</p>;

    return (
        <section className={classes.meals}>
            <Card>{content}</Card>
        </section>
    );
};

export default AvailableMeals;
