@REM add network directory
pushd %1
@REM write parameters to log

@REM run node program

node.exe --max_old_space_size=8192 C:\Users\Merovegas\Desktop\Frank\Code\work_for_NWU\app\scripts\data\data_service.js C:\Users\Merovegas\Desktop\Frank\Code\work_for_NWU\app\scripts\data\ rough_data 

@REM write end to log
@REM remove network directory
popd
@REM keep the cmd window open
pause