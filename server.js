const path = require("path");
const fs = require("fs");
const express = require("express");


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(routes)

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));