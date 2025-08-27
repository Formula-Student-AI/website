import { getAllTeams } from "@/lib/teamApi";

export default function Team() {
  const teams = getAllTeams();
  console.log(teams[0].sub_teams);
  return <div>Team</div>;
}
