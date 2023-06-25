import GenerateFormInfo from '../modules/apps/GenerateFormInfo'

const IndexPage = () => {
  return (
    <div className="min-h-screen wrapper overflow-x-auto">
      <h1 className="text-7xl w-[9999px]">happy birthday card generator</h1>
      <h1 className="animate-marquee text-3xl">aaaaaaaaaaaaaaaaaaaaaa</h1>
      <GenerateFormInfo />
      <div className="my-36"></div>
      <img className="animate-spin animate-marquee" src={"https://www.funimada.com/assets/images/cards/big/bday-905.gif"} />
    </div>
  )
}

export default IndexPage
