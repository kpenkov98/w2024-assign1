const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();
const supaUrl = "https://wejrcsaojijlxfrtoija.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlanJjc2FvamlqbHhmcnRvaWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTYzNzksImV4cCI6MjAyNDM3MjM3OX0.CRlRnblyCpynZQ4pZJ2kp8TFlxhgJU35LFW5HtsEZmM";
const supabase = supa.createClient(supaUrl, supaAnonKey);

app.listen(8080, () => {
  console.log("listening on port 8080");
});

//1 /api/seasons DONE
app.get("/api/seasons", async (req, res) => {
  try {
    const { data, error } = await supabase.from("seasons").select(`*`);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//2 /api/circuits DONE
app.get("/api/circuits", async (req, res) => {
  try {
    const { data, error } = await supabase.from("circuits").select(`name`);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//3 /api/circuits/ref DONE
app.get("/api/circuits/:ref", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("circuits")
      .select(`name`)
      .eq("circuitRef", req.params.ref.toLowerCase());
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//4 /api/circuits/season/year DONE
app.get("/api/circuits/season/:year", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("races")
      .select(`circuits (name)`)
      .eq("year", req.params.year)
      .order("round", { ascending: true });
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//5 /api/constructors DONE
app.get("/api/constructors", async (req, res) => {
  try {
    const { data, error } = await supabase.from("constructors").select(`name`);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//6 /api/constructors/ref DONE
app.get("/api/constructors/:ref", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("constructors")
      .select(`name`)
      .eq("constructorRef", req.params.ref.toLowerCase());
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//7 /api/drivers DONE
app.get("/api/drivers", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select(`forename, surname`);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//8 /api/drivers/ref DONE
app.get("/api/drivers/:ref", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select(`forename, surname`)
      .eq("driverRef", req.params.ref.toLowerCase());
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//9 /api/drivers/search/substring DONE
app.get("/api/drivers/search/:search", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select(`surname, forename`)
      .ilike("surname", `%${req.params.search.toLowerCase()}%`);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//10 /api/drivers/race/raceId DONE
app.get("/api/drivers/race/:raceId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("results")
      .select(`drivers(surname, forename)`)
      .eq("raceId", req.params.raceId);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//11 /api/races/raceId DONE
app.get("/api/races/:raceId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("races")
      .select(`circuits(name, location, country)`)
      .eq("raceId", req.params.raceId);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//12 /api/races/season/year DONE
app.get("/api/races/season/:year", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("races")
      .select(`name`)
      .eq("year", req.params.year)
      .order("round", { ascending: true });
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//13 /api/races/season/year/round DONE
app.get("/api/races/season/:year/:round", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("races")
      .select(`name`)
      .eq("year", req.params.year)
      .eq("round", req.params.round);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//14 /api/races/circuits/ref DONE
app.get("/api/races/circuits/:ref", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("circuits")
      .select(`races(raceId, year, name)`)
      .eq("circuitRef", req.params.ref.toLowerCase())
      .order("year", { referencedTable: "races", ascending: true });
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//15 /api/races/circuits/ref/season/start/end DONE
app.get("/api/races/circuits/:ref/season/:year/:yearTo/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("circuits")
      .select(`races(raceId, year, name)`)
      .eq("circuitRef", req.params.ref.toLowerCase())
      .gte("races.year", req.params.year)
      .lte("races.year", req.params.yearTo)
      .order("year", { referencedTable: "races", ascending: true });

    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      //year check
      res.send(data);
    } else {
      if (req.params.year > req.params.yearTo) {
        res.status(999).send({
          error:
            "Invalid year input: please make sure first year is less than or equal to last",
        });
      } else {
        res.status(404).send({ error: "Not found" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//16 /api/results/raceId DONE
app.get("/api/results/:raceId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("results")
      .select(
        `grid, drivers(driverRef, code, forename, surname), 
    races(name, round, year, date)
    constructors(name, constructorRef, nationality)`
      )
      .eq("raceId", req.params.raceId)
      .order("grid", { ascending: true });
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//17 /api/results/driver/ref DONE
app.get("/api/results/driver/:ref", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("drivers")
      .select(`forename, surname, results(*)`)
      .eq("driverRef", req.params.ref.toLowerCase());
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//18 /api/results/driver/ref/seasons/start/end DONE
app.get("/api/results/driver/:ref/seasons/:year/:yearTo", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("results")
      .select(`drivers!inner(forename, surname), races!inner(year), *`)
      .eq("drivers.driverRef", req.params.ref.toLowerCase())
      .gte("races.year", req.params.year)
      .lte("races.year", req.params.yearTo);
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      //year check
      res.send(data);
    } else {
      if (req.params.year > req.params.yearTo) {
        res.status(999).send({
          error:
            "Invalid year input: please make sure first year is less than or equal to last",
        });
      } else {
        res.status(404).send({ error: "Not found" });
      }
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//19 /api/qualifying/raceId DONE
app.get("/api/qualifying/:raceId", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("qualifying")
      .select(
        `position, drivers(driverRef, code, forename, surname), 
    races(name, round, year, date)
    constructors(name, constructorRef, nationality)`
      )
      .eq("raceId", req.params.raceId)
      .order("position", { ascending: true });
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//20 /api/standings/raceId/drivers DONE
app.get("/api/standings/:raceId/drivers", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("driver_standings")
      .select(
        `position, races(name, round, year, date), drivers(driverRef, code, forename, surname)`
      )
      .eq("raceId", req.params.raceId)
      .order("position", { ascending: true });
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//21 /api/standings/raceId/constructors DONE
app.get("/api/standings/:raceId/constructors", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("constructor_standings")
      .select(
        `position, races(name, round, year, date), constructors(name, constructorRef, nationality)`
      )
      .eq("raceId", req.params.raceId)
      .order("position", { ascending: true });
    if (error) {
      res.status(500).send({ error: "Internal Server Error" });
    } else if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});
