const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();
const supaUrl = "https://wejrcsaojijlxfrtoija.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlanJjc2FvamlqbHhmcnRvaWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTYzNzksImV4cCI6MjAyNDM3MjM3OX0.CRlRnblyCpynZQ4pZJ2kp8TFlxhgJU35LFW5HtsEZmM";
const supabase = supa.createClient(supaUrl, supaAnonKey);

app.listen(8080, () => {
  console.log("listening on port 8080");
  console.log("http://localhost:8080/f1/status");
});

//1 /api/seasons DONE
app.get("/api/seasons", async (req, res) => {
  const { data, error } = await supabase.from("seasons").select(`*`);
  res.send(data);
});

//2 /api/circuits DONE
app.get("/api/circuits", async (req, res) => {
  const { data, error } = await supabase.from("circuits").select(`name`);
  res.send(data);
});

//3 /api/circuits/ref DONE
app.get("/api/circuits/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("circuits")
    .select(`name`)
    .eq("circuitRef", req.params.ref);
  res.send(data);
});

//4 /api/circuits/season/year DONE
app.get("/api/circuits/season/:year", async (req, res) => {
  const { data, error } = await supabase
    .from("races")
    .select(`circuits (name)`)
    .eq("year", req.params.year)
    .order("round", { ascending: true });
  res.send(data);
});

//5 /api/constructors DONE
app.get("/api/constructors", async (req, res) => {
  const { data, error } = await supabase.from("constructors").select(`name`);
  res.send(data);
});

//6 /api/constructors/ref DONE
app.get("/api/constructors/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("constructors")
    .select(`name`)
    .eq("constructorRef", req.params.ref);
  res.send(data);
});

//7 /api/drivers DONE
app.get("/api/drivers", async (req, res) => {
  const { data, error } = await supabase
    .from("drivers")
    .select(`forename, surname`);
  res.send(data);
});

//8 /api/drivers/ref DONE
app.get("/api/drivers/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("drivers")
    .select(`forename, surname`)
    .eq("driverRef", req.params.ref);
  res.send(data);
});

//9 /api/drivers/search/substring DONE
app.get("/api/drivers/search/:search", async (req, res) => {
  const { data, error } = await supabase
    .from("drivers")
    .select(`surname, forename`)
    .ilike("surname", `%${req.params.search}%`);
  res.send(data);
});

//10 /api/drivers/race/raceId DONE
app.get("/api/drivers/race/:race", async (req, res) => {
  const { data, error } = await supabase
    .from("results")
    .select(`drivers(surname, forename)`)
    .eq("raceId", req.params.race);
  res.send(data);
});

//11 /api/races/raceId DONE
app.get("/api/races/:race", async (req, res) => {
  const { data, error } = await supabase
    .from("races")
    .select(`circuits(name, location, country)`)
    .eq("raceId", req.params.race);
  res.send(data);
});

//12 /api/races/season/year DONE
app.get("/api/races/season/:year", async (req, res) => {
  const { data, error } = await supabase
    .from("races")
    .select(`name`)
    .eq("year", req.params.year)
    .order("round", { ascending: true });
  res.send(data);
});

//13 /api/races/season/year/round

//14 /api/races/circuits/ref

//15 /api/races/circuits/ref/season/start/end

//16 /api/results/raceId

//17 /api/results/driver/ref

//18 /api/results/driver/ref/seasons/start/end

//19 /api/qualifying/raceId

//20 /api/standings/raceId/drivers

//21 /api/standings/raceId/constructors
