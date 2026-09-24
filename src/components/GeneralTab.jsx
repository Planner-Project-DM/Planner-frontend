import SettingsCard from '../components/SettingsCard.jsx';

export default function GeneralTab({darkMode, isDark}) {

    function changeTheme(e) {
        if (e.target.value === "light") {
            darkMode(false)
        } else {
            darkMode(true)
        }
    }

    return (
        <>
            <SettingsCard header={"Waluta"} paragraph={"Wybierz walutę, w której chcesz widzieć kwoty na stronie."}
                          options={[{
                              value: "pln",
                              label: "PLN zł"
                          },
                              {
                                  value: "dolar",
                                  label: "Dolar $"
                              }]}
                          showButton={true} showSelect={true} showInput={false}
            />
            <SettingsCard header={"Język"} paragraph={"Wybierz swój preferowany język."}
                          options={[{
                              value: "pl",
                              label: "Polski"
                          },
                              {
                                  value: "eng",
                                  label: "English"
                              }]}
                          showButton={true} showSelect={true} showInput={false}
            />
            <SettingsCard header={"Motyw"} paragraph={"Dostosuj wygląd strony, wybierając jasny lub ciemny motyw."}
                          options={[{
                              value: "light",
                              label: "Jasny"
                          },
                              {
                                  value: "dark",
                                  label: "Ciemny"
                              }]}
                          showButton={false} showSelect={true} showInput={false}
                          selectValue={isDark ? "dark" : "light"}
                          onChange={changeTheme}
            />
        </>
    )
}