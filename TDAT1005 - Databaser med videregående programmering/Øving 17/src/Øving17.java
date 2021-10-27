import javafx.application.Application;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.GridPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.stage.Stage;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;


public class Øving17 extends Application {
    Stage window;
    Scene scene;
    Button clear, convert;
    ListView<String> fraValutaList, tilValutaList;
    TextField fraValutaField, tilValutaField;
    Label tittel, fraValutaInputLabel, tilValutaInputLabel, fraValutaVelgLabel, tilvalutaVelgLabel, omgjøringsKommentar;

    public static void main(String[] args){
        launch(args);
    }

    //@SuppressWarnings("Duplicates")

    @Override
    public void start(Stage primaryStage) throws Exception{
        window = primaryStage;
        window.setTitle("Valutakalkulator");

        //Label
        tittel = new Label("Valutakalkulator");
        tittel.setFont(Font.font("Calibri", 32));
        tittel.setStyle("-fx-font-weight: bold");
        fraValutaInputLabel = new Label("Sett inn beløp:");
        tilValutaInputLabel = new Label("Er lik:");
        fraValutaVelgLabel = new Label("Fra Valuta:");
        tilvalutaVelgLabel = new Label("Til Valuta");
        omgjøringsKommentar = new Label("");
        omgjøringsKommentar.setTextFill(Color.RED);

        //Field
        fraValutaField = new TextField();
        tilValutaField = new TextField();
        tilValutaField.setEditable(false);

        //ListView 1 - fraValutaList
        fraValutaList = new ListView<>();

        ArrayList<Valuta> fraValutaer = new ArrayList<>();
        fraValutaer.add(new Valuta("Euro", 8.10, 1));
        fraValutaer.add(new Valuta("US Dollar", 6.23, 1));
        fraValutaer.add(new Valuta("Britiske pund", 12.27, 1));
        fraValutaer.add(new Valuta("Svenske kroner", 88.96, 100));
        fraValutaer.add(new Valuta("Danske kroner", 108.75, 100));
        fraValutaer.add(new Valuta("Yen", 5.14, 100));
        fraValutaer.add(new Valuta("Islandske kroner", 9.16, 100));
        fraValutaer.add(new Valuta("Norske kroner", 100, 100));

        for(int i = 0; i < fraValutaer.size(); i++){
            fraValutaList.getItems().add(fraValutaer.get(i).getNavn());
        }
        fraValutaList.getItems().add("Ny Valuta");
        //fraValutaList.getSelectionModel().setSelectionMode(SelectionMode.SINGLE);


        //ListView 2 - tilValutaList
        tilValutaList = new ListView<>();

        ArrayList<Valuta> tilValutaer = new ArrayList<>();
        tilValutaer.add(new Valuta("Euro", 8.10, 1));
        tilValutaer.add(new Valuta("US Dollar", 6.23, 1));
        tilValutaer.add(new Valuta("Britiske pund", 12.27, 1));
        tilValutaer.add(new Valuta("Svenske kroner", 88.96, 100));
        tilValutaer.add(new Valuta("Danske kroner", 108.75, 100));
        tilValutaer.add(new Valuta("Yen", 5.14, 100));
        tilValutaer.add(new Valuta("Islandske kroner", 9.16, 100));
        tilValutaer.add(new Valuta("Norske kroner", 100, 100));

        for(int i = 0; i < tilValutaer.size(); i++){
            tilValutaList.getItems().add(tilValutaer.get(i).getNavn());
        }
        tilValutaList.getItems().add("Ny Valuta");
        //tilValutaList.getSelectionModel().setSelectionMode(SelectionMode.SINGLE);

        //Clearknapp
        clear = new Button("Tøm");
        clear.setOnAction(actionEvent -> {
            fraValutaField.clear();
            tilValutaField.clear();
            omgjøringsKommentar.setText("");
        });

        //Convertknapp
        convert = new Button("Omgjør");
        convert.setOnAction(e -> {
            String inputString = fraValutaField.getText();
            String fraValutaValgt = fraValutaList.getSelectionModel().getSelectedItem();
            String tilValutaValgt = tilValutaList.getSelectionModel().getSelectedItem();
            Valuta valgtFraValuta = getValuta(fraValutaer, fraValutaValgt);
            Valuta valgtTilValuta = getValuta(tilValutaer, tilValutaValgt);

            if (fraValutaValgt == "Ny Valuta" || tilValutaValgt == "Ny Valuta") {
                //Rengjør først startskjermen
                fraValutaField.clear();
                tilValutaField.clear();
                omgjøringsKommentar.setText("");

                Label nyValutaTittel = new Label("Ny Valuta");
                nyValutaTittel.setFont(Font.font("Calibri", 24));
                Label valutaNavn = new Label("Valutanavn:");
                Label kursMotNorske = new Label("Kurs mot norske:");
                Label enhet = new Label("Enhet:");
                Label nyValutaKommentar = new Label("");
                nyValutaKommentar.setTextFill(Color.RED);
                TextField valutaNavnField = new TextField();
                TextField kursMotNorskeField = new TextField();
                TextField enhetField = new TextField();

                String kursString = kursMotNorskeField.getText();
                String enhetsString = enhetField.getText();

                Button leggTil = new Button("Legg til");
                leggTil.setOnAction(actionEvent -> {
                    try {
                        //først må jeg sjekke om valutaNavn ikke er tom
                        if (valutaNavnField.getText().equals("") || valutaNavnField.getText().equals(" ")) {
                            nyValutaKommentar.setText("Fyll inn navn");
                        } else {
                            Valuta nyValuta = new Valuta(valutaNavnField.getText(), Double.parseDouble(kursMotNorskeField.getText()), Integer.parseInt(enhetField.getText()));
                            fraValutaer.add(nyValuta);
                            tilValutaer.add(nyValuta);
                            oppdaterListe(fraValutaer, fraValutaList);
                            oppdaterListe(tilValutaer, tilValutaList);
                            window.setScene(scene);
                        }
                    }catch (Exception p){
                        nyValutaKommentar.setText("Feil kurs/enhet");
                    }
                });

                Button clear2 = new Button("Tøm");
                clear2.setOnAction(actionEvent -> {
                    valutaNavnField.clear();
                    kursMotNorskeField.clear();
                    enhetField.clear();
                    nyValutaKommentar.setText("");
                });

                Button tilbake = new Button("Tilbake");
                tilbake.setOnAction(actionEvent -> {
                    window.setScene(scene);
                });

                GridPane nyValutaLayout = new GridPane();
                nyValutaLayout.setPadding(new Insets(20, 20, 20, 20));
                nyValutaLayout.setVgap(10);
                nyValutaLayout.setHgap(10);
                nyValutaLayout.add(nyValutaTittel, 0, 0, 2, 1);
                nyValutaLayout.setHalignment(nyValutaTittel, HPos.CENTER);
                nyValutaLayout.add(tilbake, 0, 0);
                nyValutaLayout.setHalignment(tilbake, HPos.LEFT);
                nyValutaLayout.add(valutaNavn, 0, 1);
                nyValutaLayout.add(valutaNavnField, 1, 1);
                nyValutaLayout.add(kursMotNorske, 0, 2);
                nyValutaLayout.add(kursMotNorskeField, 1, 2);
                nyValutaLayout.add(enhet, 0, 3);
                nyValutaLayout.add(enhetField, 1, 3);
                nyValutaLayout.add(leggTil, 1, 4);
                nyValutaLayout.add(clear2, 1, 4);
                nyValutaLayout.add(nyValutaKommentar, 0, 4);
                nyValutaLayout.setHalignment(clear2, HPos.LEFT);
                nyValutaLayout.setHalignment(leggTil, HPos.RIGHT);

                Scene nyValutaScene = new Scene(nyValutaLayout, 350, 250);
                window.setScene(nyValutaScene);

            }else if(!sjekkOmDouble(inputString)) {//Dersom den ikke er en double
                omgjøringsKommentar.setText("Du må skrive inn et tall");
            }else if (valgtFraValuta.getNavn().equals("TOM")){
                omgjøringsKommentar.setText("Du må velge en fra-valuta");
            }else if (valgtTilValuta.getNavn().equals("TOM")) {
                omgjøringsKommentar.setText("Du må velge en til-valuta");
            }else{
                //Hvis det er valgt to ulike valutaer og klart for omgjøring
                omgjøringsKommentar.setText("");
                convert(Double.parseDouble(inputString), valgtFraValuta, valgtTilValuta);
            }
            });


        GridPane layout = new GridPane();
        layout.setVgap(10);
        layout.setHgap(10);
        layout.setPadding(new Insets(20, 20, 20, 20));
        layout.add(tittel, 0, 0, 2, 1);
        layout.setHalignment(tittel, HPos.CENTER);
        layout.add(fraValutaInputLabel, 0, 1);
        layout.add(tilValutaInputLabel, 1, 1);
        layout.add(fraValutaField, 0, 2);
        layout.add(tilValutaField, 1, 2);
        layout.add(fraValutaList, 0, 3);
        layout.add(tilValutaList, 1, 3);
        layout.add(omgjøringsKommentar, 0, 4);
        layout.add(clear, 1, 4);
        layout.add(convert, 1, 4);
        layout.setHalignment(clear, HPos.CENTER);
        layout.setHalignment(convert, HPos.RIGHT);
        layout.add(new Label("Hint: For å legge til ny Valuta, velg \"Ny Valuta\" og trykk \"omgjør\""), 0, 5, 2, 1);

        scene = new Scene(layout, 450, 400);
        window.setScene(scene);
        window.show();
    }

    private void convert(double input, Valuta fraValuta, Valuta tilValuta){
        double output = 0;

        double fraValutaTall = fraValuta.getEnhet()/fraValuta.getKursMotNorske();
        double tilValutaTall = tilValuta.getEnhet()/tilValuta.getKursMotNorske();
        output = (input/fraValutaTall)*tilValutaTall;
        DecimalFormat df2 = new DecimalFormat(".##");
        tilValutaField.setText(df2.format(output));
    }

    private Valuta getValuta(ArrayList<Valuta> valutaList, String valgtValuta){
        Valuta valuta = new Valuta("TOM", 1, 1);
        for(int i = 0; i<valutaList.size(); i++){
            if(valutaList.get(i).getNavn().equals(valgtValuta)) {
                valuta = valutaList.get(i);
            }
        }
        return valuta;
    }

    private void oppdaterListe(ArrayList<Valuta> array, ListView<String> liste){
        //Tømmer lista først
        liste.getItems().clear();
        //Fyller så på på nytt
        for(int i = 0; i < array.size(); i++){
            liste.getItems().add(array.get(i).getNavn());
        }
        liste.getItems().add("Ny Valuta");
    }

    private boolean sjekkOmDouble(String input){
        boolean erDouble = true;
        try{
            double inputDouble = Double.parseDouble(input);
        }catch (Exception a){
            erDouble = false;
        }
        return erDouble;
    }










}
