export default function KnowledgeArticleLoading() {
  return (
    <div className="min-h-screen bg-background px-5 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-52 bg-accent/20" />
        <div className="mt-8 h-20 max-w-4xl bg-foreground/10" />
        <div className="mt-6 h-6 max-w-2xl bg-foreground/10" />
        <div className="mt-12 grid gap-8 lg:grid-cols-[0.3fr_0.7fr]">
          <div className="h-96 bg-foreground/5" />
          <div className="h-[720px] bg-foreground/5" />
        </div>
      </div>
    </div>
  )
}
