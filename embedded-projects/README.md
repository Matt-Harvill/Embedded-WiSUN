# Overview and Setup

This directory contains projects for TI's <u>CC1312R7</u> and <u>CC1352P7-1</u> Launchpads. To flash the devices, import these projects into TI's CCS (Code Composer Studio). This is done by following `File -> Import -> C/C++ -> CCS Projects` then click `Next`, navigate to this directory, and for each project, select both boxes shown below:

<div align="center" >
    <img src="../images/Import Settings Image.png" alt="Import Settings" />
</div>

 After this step, click `Finish` and you will have both projects in your CCS workspace.

 # Flashing

 To flash your devices with these projects, click the debug button and `Run as Code Composer Studio Debug Session`. After all popups disappear, click the green arrow and then terminate with the red square. Now your device is correctly flashed.

 # Important Notes

 To use the UTDesign boosterpacks, the jumper that is next to BTN-2 on the right side of each board needs to be switched from `XDS110 Power` to `Extern Power` *(A closeup is shown below)*. Make sure that when flashing the device, the jumper is switched back, otherwise there will be errors.

 <div align="center" >
    <img src="../images/Power Selection Closeup.jpg" alt="Power Selection Closeup" width="300" />
</div>
