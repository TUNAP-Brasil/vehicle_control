<html lang="pt">
<head>
    <meta charset="utf-8">
    <title>Marca</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">

    <link href="{{ public_path('assets/css/reports/styles.css') }}" rel="stylesheet" type="text/css"/>
    <link href="{{ public_path('assets/css/reports/toyota.css') }}" rel="stylesheet" type="text/css"/>
</head>
<body>
<table>
    <tbody>
    <tr>
        <td class="w-15">
            <img src="{{ public_path('assets/images/reports/Toyota-Logo.png') }}" class="w-75">
        </td>
        <td class="w-60 text-center">
            <span class="title-3">Comércio de Veículos Toyota Tsusho Ltda.</span>
        </td>
        <td class="w-25"></td>
    </tr>
    </tbody>
</table>

<table id="address">
    <tbody>
    <tr>
        <td><p>Av. Vol. Fernando Pinheiro Franco, 544 - Centro - Mogi das Cruzes - SP CEP 08710-500 - Tel.: 4795-5555</p></td>
    </tr>
    <tr>
        <td><p>Av. Prof. Abraão de Moraes, 2250 - Saúde - SP - CEP 04123001 - Tel.: 558Ç5555</p></td>
    </tr>
    <tr>
        <td><p>Av. Guido Alberti, 1 1 1 - Santo Antonio - Caetano do sul - SP - CEP 09530000 - Tel.: 4224-0555</p></td>
    </tr>
    <tr>
        <td><p>Av. Major Pinheiro Froes, 1157 - Suzano - sp - CEP 08680-000 - Tel.: 2500-055</p></td>
    </tr>
    </tbody>
</table>

<table id="report-title">
    <tbody>
    <tr>
        <td class="text-center">
            FOLHA DE INSPEÇÃO - CONDIÇÕES DE ENTRADA E SAíDA DO VEíCULO - SUV
        </td>
    </tr>
    </tbody>
</table>

<table id="color-legend" style="">
    <tbody>
    <tr>
        <td class="bg-success"><span>OK/SUBSTITUÍDO</span></td>
        <td class="bg-warning">REQUER TROCA/REPARO FUTURO</td>
        <td class="bg-danger">REQUER TROCA/REPARO IMEDIATO</td>
    </tr>
    </tbody>
</table>

<table class="w-100">
    <tbody>
    <tr>
        <td class="w-38">
            @include('reports.vehicle-service.toyota.section-1')
        </td>
        <td class="w-1 h-1">

        </td>
        <td class="w-61">

        </td>
    </tr>
    </tbody>
</table>

<table>
    <tbody>
    <tr>

    </tr>
    </tbody>
</table>

<table>
    <tbody>
    <tr>

    </tr>
    </tbody>
</table>

</body>
</html>
