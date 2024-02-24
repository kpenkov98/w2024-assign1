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

//6 /api/constructors/ref 

//7 /api/drivers

//8 /api/drivers/ref

//9 /api/drivers/search/substring

//10 /api/drivers/race/raceId

//11 /api/races/raceId

//12 /api/races/season/year

//13 /api/races/season/year/round

//14 /api/races/circuits/ref

//15 /api/races/circuits/ref/season/start/end

//16 /api/results/raceId

//17 /api/results/driver/ref

//18 /api/results/driver/ref/seasons/start/end

//19 /api/qualifying/raceId

//20 /api/standings/raceId/drivers

//21 /api/standings/raceId/constructors
