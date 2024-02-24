const express = require("express");
const supa = require("@supabase/supabase-js");
const app = express();
const supaUrl = "https://wejrcsaojijlxfrtoija.supabase.co";
const supaAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlanJjc2FvamlqbHhmcnRvaWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg3OTYzNzksImV4cCI6MjAyNDM3MjM3OX0.CRlRnblyCpynZQ4pZJ2kp8TFlxhgJU35LFW5HtsEZmM";
const supabase = supa.createClient(supaUrl, supaAnonKey);

