import Grid from "../Components/Grid";



export default function HomePage() {
  return (
    <div className="flex flex-col gap-4">
      <Grid url={"https://api.jikan.moe/v4/seasons/now?sfw"} text="Populares"></Grid>
      <Grid url={"https://api.jikan.moe/v4/top/anime?sfw"} text="Top anime"></Grid>
    </div>
  );
}
