const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();
const supaUrl = "https://wejrcsaojijlxfrtoija.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlanJjc2FvamlqbHhmcnRvaWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTYzNzksImV4cCI6MjAyNDM3MjM3OX0.CRlRnblyCpynZQ4pZJ2kp8TFlxhgJU35LFW5HtsEZmM";
const supabase = supa.createClient(supaUrl, supaAnonKey);

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

//13 /api/races/season/year/round DONE
app.get("/api/races/season/:year/:round", async (req, res) => {
  const { data, error } = await supabase
    .from("races")
    .select(`name`)
    .eq("year", req.params.year)
    .eq("round", req.params.round);
  res.send(data);
});

//14 /api/races/circuits/ref DONE
app.get("/api/races/circuits/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("circuits")
    .select(`races(raceId, year, name)`)
    .eq("circuitRef", req.params.ref)
    .order("year", { referencedTable: "races", ascending: true });
  res.send(data);
});

//15 /api/races/circuits/ref/season/start/end DONE
app.get("/api/races/circuits/:ref/season/:year/:yearTo/", async (req, res) => {
  const { data, error } = await supabase
    .from("circuits")
    .select(`races(raceId, year, name)`)
    .eq("circuitRef", req.params.ref)
    .gte("races.year", req.params.year)
    .lte("races.year", req.params.yearTo)
    .order("year", { referencedTable: "races", ascending: true });
  res.send(data);
});

//16 /api/results/raceId DONE
app.get("/api/results/:raceId", async (req, res) => {
  const { data, error } = await supabase
    .from("results")
    .select(
      `grid, drivers(driverRef, code, forename, surname), 
    races(name, round, year, date)
    constructors(name, constructorRef, nationality)`
    )
    .eq("raceId", req.params.raceId)
    .order("grid", { ascending: true });
  res.send(data);
});

//17 /api/results/driver/ref DONE
app.get("/api/results/driver/:ref", async (req, res) => {
  const { data, error } = await supabase
    .from("drivers")
    .select(`forename, surname, results(*)`)
    .eq("driverRef", req.params.ref);
  res.send(data);
});

//18 /api/results/driver/ref/seasons/start/end DONE
app.get("/api/results/driver/:ref/seasons/:start/:end", async (req, res) => {
  const { data, error } = await supabase
    .from("results")
    .select(`drivers!inner(forename, surname), races!inner(year), *`)
    .eq("drivers.driverRef", req.params.ref)
    .gte("races.year", req.params.start)
    .lte("races.year", req.params.end);
  res.send(data);
});

//19 /api/qualifying/raceId DONE
app.get("/api/qualifying/:raceId", async (req, res) => {
  const { data, error } = await supabase
    .from("qualifying")
    .select(
      `position, drivers(driverRef, code, forename, surname), 
    races(name, round, year, date)
    constructors(name, constructorRef, nationality)`
    )
    .eq("raceId", req.params.raceId)
    .order("position", { ascending: true });
  res.send(data);
});

//20 /api/standings/raceId/drivers DONE
app.get("/api/standings/:raceId/drivers", async (req, res) => {
  const { data, error } = await supabase
    .from("driver_standings")
    .select(
      `position, races(name, round, year, date), drivers(driverRef, code, forename, surname)`
    )
    .eq("raceId", req.params.raceId)
    .order("position", { ascending: true });
  res.send(data);
});

//21 /api/standings/raceId/constructors DONE
app.get("/api/standings/:raceId/constructors", async (req, res) => {
  const { data, error } = await supabase
    .from("constructor_standings")
    .select(
      `position, races(name, round, year, date), constructors(name, constructorRef, nationality)`
    )
    .eq("raceId", req.params.raceId)
    .order("position", { ascending: true });
  res.send(data);
});
