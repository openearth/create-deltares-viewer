export const xmlRequestTemplate = ({ functionId, lineData, ...rest }) => `
  <wps:Execute xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" service="WPS" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
    <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">${functionId}</ows:Identifier>
    <wps:DataInputs>
      ${wpsInput(...lineData)}
      ${inputsToWpsInputs(rest)}
    </wps:DataInputs>
    <wps:ResponseForm>
      <wps:RawDataOutput mimeType="application/json">
        <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">values2</ows:Identifier>
      </wps:RawDataOutput>
    </wps:ResponseForm>
  </wps:Execute>
`;

function wpsInput(identifier, data) {
  return `
    <wps:Input>
      <ows:Identifier xmlns:ows="http://www.opengis.net/ows/1.1">${identifier}</ows:Identifier>
      <ows:Title xmlns:ows="http://www.opengis.net/ows/1.1">${identifier}</ows:Title>
      <wps:Data>
        <wps:LiteralData>${data}</wps:LiteralData>
      </wps:Data>
    </wps:Input>
  `;
}

function inputsToWpsInputs(inputs) {
  return Object.keys(inputs).reduce((xml, key) => {
    const value = inputs[key];
    return `${xml}${wpsInput(
      key,
      typeof value === "object" ? JSON.stringify(value) : value
    )}\n`;
  }, "");
}
